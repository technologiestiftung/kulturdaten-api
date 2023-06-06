import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../../common/services/mongodb.service';
import { MongoDBLocationsRepository } from '../../resources/locations/repositories/locations.repository.mobgodb';
import { LocationsService } from '../../resources/locations/services/locations.service';
import { LocationsController } from '../../resources/locations/controllers/locations.controller';
import { LocationsRoutes } from '../../resources/locations/locations.routes';
import express from 'express';
import request from "supertest";
import { validateLocation } from '../../generated/models/Location.generated';
import twoDummyLocations from './dummy.data/locations.json';
import { IDENTIFIER_REG_EX } from '../utils/matcher';
import { fakeCreateLocation } from '../../generated/faker/faker.CreateLocation.generated';

describe('Create locations', () => {
  afterEach(async () => {
    await locations.deleteMany();
  });

  it('should create a location and return a identifier / POST /locations', async () => {
    const { body, statusCode } = await request(app).post('/v1/locations').send(fakeCreateLocation(false, { name : { de: 'New Location'}}));

    expect(statusCode).toBe(201);

    expect(body.identifier).toMatch(IDENTIFIER_REG_EX);
    let loc = await locations.findOne({identifier: body.identifier});
    expect(loc?.name.de).toBe('New Location');
  });
});

describe('Read locations', () => {
  beforeEach(async () => {
    await locations.insertMany(twoDummyLocations);
  });

  afterEach(async () => {
    await locations.deleteMany();
  });

  it('should return a list of all locations / GET /locations', async () => {
    const { body, statusCode } = await request(app).get('/v1/locations');

    expect(statusCode).toBe(200);
    expect(body.locations).toHaveLength(2);
    for (const o of body.locations) {
      expect(validateLocation(o).isValid).toBe(true);
    }
  });

  it('should return a empty list / GET /locations', async () => {
    await locations.deleteMany();

    const { body, statusCode } = await request(app).get('/v1/locations');

    expect(statusCode).toBe(200);
    expect(body.locations).toHaveLength(0);
  });

  it('should return an error when an invalid ID is provided / GET /locations/invalidID', async () => {
    const { body, statusCode } = await request(app).get('/v1/locations/invalidID');

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('Location not found');
  });

  it('should return a single location / GET /locations/existID', async () => {
    const { body, statusCode } = await request(app).get('/v1/locations/10001');

    expect(statusCode).toBe(200);
    expect(validateLocation(body.location).isValid).toBe(true);
    expect(body.location.identifier).toBe('10001');
    expect(body.location.name.de).toBe('Berliner Philharmonie');
  });
});


describe('Update locations', () => {
  beforeEach(async () => {
    await locations.insertMany(twoDummyLocations);
  });

  afterEach(async () => {
    await locations.deleteMany();
  });

  it('should update the name of a location / PATCH /locations/existID', async () => {
    const { body, statusCode } = await request(app).patch('/v1/locations/10001').send({
			name: { de :'Neuer Name' }
		});

    expect(statusCode).toBe(204);
    let loc = await locations.findOne({identifier: '10001'});
    expect(loc?.name.de).toBe('Neuer Name');
  });

  it('should return an error when an invalid ID is provided / PATCH /locations/invalidID', async () => {
    const { body, statusCode } = await request(app).patch('/v1/locations/invalidID').send({
			name: { de :'Neuer Name' }
		});

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('Location not found');
  });
});

describe('Delete locations', () => {
  beforeEach(async () => {
    await locations.insertMany(twoDummyLocations);
  });

  afterEach(async () => {
    await locations.deleteMany();
  });

  it('should remove a location from database / PATCH /locations/existID', async () => {
    const { body, statusCode } = await request(app).delete('/v1/locations/10001');

    expect(statusCode).toBe(204);
    let loc = await locations.findOne({identifier: '10001'});
    expect(loc).toBeNull
  });
});

let con: MongoClient;
let mongoServer: MongoMemoryServer;
let connector: MongoDBConnector;
let app: express.Application;
let locations: Collection;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'api-db' } });
  process.env.MONGO_URI = mongoServer.getUri();
  con = await MongoClient.connect(mongoServer.getUri(), {});
  connector = new MongoDBConnector(con);
  const locationsRepository = new MongoDBLocationsRepository(connector);
  const locationsService = new LocationsService(locationsRepository);
  const locationsController = new LocationsController(locationsService);
  const locationsRoutes = new LocationsRoutes(locationsController);
  const db = con.db('api-db');
  locations = db.collection('locations');

  app = express();
  app.use(express.json());
  app.use('/v1/locations', locationsRoutes.getRouter());
});

afterAll(async () => {
  if (con) {
    await con.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  if (connector) {
    await connector.close();
  }
});