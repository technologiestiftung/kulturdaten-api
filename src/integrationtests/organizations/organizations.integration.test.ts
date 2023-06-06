import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../../common/services/mongodb.service';
import { MongoDBOrganizationsRepository } from '../../resources/organizations/repositories/organizations.repository.mobgodb';
import { OrganizationsService } from '../../resources/organizations/services/organizations.service';
import { OrganizationsController } from '../../resources/organizations/controllers/organizations.controller';
import { OrganizationsRoutes } from '../../resources/organizations/organizations.routes';
import express from 'express';
import request from "supertest";
import { validateOrganization } from '../../generated/models/Organization.generated';
import twoDummyOrganizations from './dummy.data/organizations.json';
import { IDENTIFIER_REG_EX } from '../utils/matcher';
import { fakeCreateOrganization } from '../../generated/faker/faker.CreateOrganization.generated';

describe('Create organizations', () => {
  afterEach(async () => {
    await organizations.deleteMany();
  });

  it('should create a organization and return a identifier / POST /organizations', async () => {
    const { body, statusCode } = await request(app).post('/v1/organizations').send(fakeCreateOrganization(false, { name : { de: 'New Organization'}}));

    expect(statusCode).toBe(201);

    expect(body.identifier).toMatch(IDENTIFIER_REG_EX);
    let loc = await organizations.findOne({identifier: body.identifier});
    expect(loc?.name.de).toBe('New Organization');
  });
});

describe('Read organizations', () => {
  beforeEach(async () => {
    await organizations.insertMany(twoDummyOrganizations);
  });

  afterEach(async () => {
    await organizations.deleteMany();
  });

  it('should return a list of all organizations / GET /organizations', async () => {
    const { body, statusCode } = await request(app).get('/v1/organizations');

    expect(statusCode).toBe(200);
    expect(body.organizations).toHaveLength(2);
    for (const o of body.organizations) {
      expect(validateOrganization(o).isValid).toBe(true);
    }
  });

  it('should return a empty list / GET /organizations', async () => {
    await organizations.deleteMany();

    const { body, statusCode } = await request(app).get('/v1/organizations');

    expect(statusCode).toBe(200);
    expect(body.organizations).toHaveLength(0);
  });

  it('should return an error when an invalid ID is provided / GET /organizations/invalidID', async () => {
    const { body, statusCode } = await request(app).get('/v1/organizations/invalidID');

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('Organization not found');
  });

  it('should return a single organization / GET /organizations/existID', async () => {
    const { body, statusCode } = await request(app).get('/v1/organizations/2001');

    expect(statusCode).toBe(200);
    expect(validateOrganization(body.organization).isValid).toBe(true);
    expect(body.organization.identifier).toBe('2001');
    expect(body.organization.name.de).toBe('Kneipenbetreiber Berlin');
  });
});


describe('Update organizations', () => {
  beforeEach(async () => {
    await organizations.insertMany(twoDummyOrganizations);
  });

  afterEach(async () => {
    await organizations.deleteMany();
  });

  it('should update the name of a organization / PATCH /organizations/existID', async () => {
    const { body, statusCode } = await request(app).patch('/v1/organizations/2001').send({
			name: { de :'Neuer Name' }
		});

    expect(statusCode).toBe(204);
    let loc = await organizations.findOne({identifier: '2001'});
    expect(loc?.name.de).toBe('Neuer Name');
  });

  it('should return an error when an invalid ID is provided / PATCH /organizations/invalidID', async () => {
    const { body, statusCode } = await request(app).patch('/v1/organizations/invalidID').send({
			name: { de :'Neuer Name' }
		});

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('Organization not found');
  });
});

describe('Delete organizations', () => {
  beforeEach(async () => {
    await organizations.insertMany(twoDummyOrganizations);
  });

  afterEach(async () => {
    await organizations.deleteMany();
  });

  it('should remove a organization from database / PATCH /organizations/existID', async () => {
    const { body, statusCode } = await request(app).delete('/v1/organizations/2001');

    expect(statusCode).toBe(204);
    let loc = await organizations.findOne({identifier: '2001'});
    expect(loc).toBeNull
  });
});

let con: MongoClient;
let mongoServer: MongoMemoryServer;
let connector: MongoDBConnector;
let app: express.Application;
let organizations: Collection;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'api-db' } });
  process.env.MONGO_URI = mongoServer.getUri();
  con = await MongoClient.connect(mongoServer.getUri(), {});
  connector = new MongoDBConnector(con);
  const organizationsRepository = new MongoDBOrganizationsRepository(connector);
  const organizationsService = new OrganizationsService(organizationsRepository);
  const organizationsController = new OrganizationsController(organizationsService);
  const organizationsRoutes = new OrganizationsRoutes(organizationsController);
  const db = con.db('api-db');
  organizations = db.collection('organizations');

  app = express();
  app.use(express.json());
  app.use('/v1/organizations', organizationsRoutes.getRouter());
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