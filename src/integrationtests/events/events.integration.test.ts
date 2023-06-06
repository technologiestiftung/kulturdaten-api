import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../../common/services/mongodb.service';
import { MongoDBEventsRepository } from '../../resources/events/repositories/events.repository.mobgodb';
import { EventsService } from '../../resources/events/services/events.service';
import { EventsController } from '../../resources/events/controllers/events.controller';
import { EventsRoutes } from '../../resources/events/events.routes';
import express from 'express';
import request from "supertest";
import { validateEvent } from '../../generated/models/Event.generated';
import threeDummyEvents from './dummy.data/events.json';
import { IDENTIFIER_REG_EX } from '../utils/matcher';
import { fakeCreateEvent } from '../../generated/faker/faker.CreateEvent.generated';

describe('Create events', () => {
  afterEach(async () => {
    await events.deleteMany();
  });

  it('should create a event and return a identifier / POST /events', async () => {
    const { body, statusCode } = await request(app).post('/v1/events').send(fakeCreateEvent(false, { title : { de: 'New Event'}}));

    expect(statusCode).toBe(201);

    expect(body.identifier).toMatch(IDENTIFIER_REG_EX);
    let loc = await events.findOne({identifier: body.identifier});
    expect(loc?.title.de).toBe('New Event');
  });
});

describe('Read events', () => {
  beforeEach(async () => {
    await events.insertMany(threeDummyEvents);
  });

  afterEach(async () => {
    await events.deleteMany();
  });

  it('should return a list of all events / GET /events', async () => {
    const { body, statusCode } = await request(app).get('/v1/events');

    expect(statusCode).toBe(200);
    expect(body.events).toHaveLength(3);
    for (const o of body.events) {
      expect(validateEvent(o).isValid).toBe(true);
    }
  });

  it('should return a empty list / GET /events', async () => {
    await events.deleteMany();

    const { body, statusCode } = await request(app).get('/v1/events');

    expect(statusCode).toBe(200);
    expect(body.events).toHaveLength(0);
  });

  it('should return an error when an invalid ID is provided / GET /events/invalidID', async () => {
    const { body, statusCode } = await request(app).get('/v1/events/invalidID');

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('Event not found');
  });

  it('should return a single event / GET /events/existID', async () => {
    const { body, statusCode } = await request(app).get('/v1/events/1001');

    expect(statusCode).toBe(200);
    expect(validateEvent(body.event).isValid).toBe(true);
    expect(body.event.identifier).toBe('1001');
    expect(body.event.profile.title.de).toBe('Sommerkonzert im Park');
  });
});


describe('Update events', () => {
  beforeEach(async () => {
    await events.insertMany(threeDummyEvents);
  });

  afterEach(async () => {
    await events.deleteMany();
  });

  it('should update the name of a event / PATCH /events/existID', async () => {
    const { body, statusCode } = await request(app).patch('/v1/events/1001').send({
			name: { de :'Neuer Name' }
		});

    expect(statusCode).toBe(204);
    let loc = await events.findOne({identifier: '1001'});
    expect(loc?.name.de).toBe('Neuer Name');
  });

  it('should return an error when an invalid ID is provided / PATCH /events/invalidID', async () => {
    const { body, statusCode } = await request(app).patch('/v1/events/invalidID').send({
			name: { de :'Neuer Name' }
		});

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('Event not found');
  });
});

describe('Delete events', () => {
  beforeEach(async () => {
    await events.insertMany(threeDummyEvents);
  });

  afterEach(async () => {
    await events.deleteMany();
  });

  it('should remove a event from database / PATCH /events/existID', async () => {
    const { body, statusCode } = await request(app).delete('/v1/events/1001');

    expect(statusCode).toBe(204);
    let loc = await events.findOne({identifier: '1001'});
    expect(loc).toBeNull
  });
});

let con: MongoClient;
let mongoServer: MongoMemoryServer;
let connector: MongoDBConnector;
let app: express.Application;
let events: Collection;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'api-db' } });
  process.env.MONGO_URI = mongoServer.getUri();
  con = await MongoClient.connect(mongoServer.getUri(), {});
  connector = new MongoDBConnector(con);
  const eventsRepository = new MongoDBEventsRepository(connector);
  const eventsService = new EventsService(eventsRepository);
  const eventsController = new EventsController(eventsService);
  const eventsRoutes = new EventsRoutes(eventsController);
  const db = con.db('api-db');
  events = db.collection('events');

  app = express();
  app.use(express.json());
  app.use('/v1/events', eventsRoutes.getRouter());
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
