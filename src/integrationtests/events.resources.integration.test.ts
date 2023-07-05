import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../common/services/mongodb.service';
import { MongoDBEventsRepository } from '../resources/events/repositories/events.repository.mobgodb';
import { EventsService } from '../resources/events/services/events.service';
import { EventsController } from '../resources/events/controllers/events.controller';
import { EventsRoutes } from '../resources/events/events.routes';
import express from 'express';
import request from "supertest";

import { validateEvent } from '../generated/models/Event.generated';

import { fakeCreateEventRequest } from '../generated/faker/faker.CreateEventRequest.generated';

import { IDENTIFIER_REG_EX } from './testutils/testmatcher';


import threeDummyEvents from './testdata/events.json';



describe('Validate testData', () => {
	beforeEach(async () => {
		await events.insertMany(threeDummyEvents);
	});

	afterEach(async () => {
		await events.deleteMany();
	});

	it('should validate the test data', async () => {
		const eventDocuments = await events.find().toArray();
		for (const o of eventDocuments) {
			expect(validateEvent(o).isValid).toBe(true);
		}
	});
});

describe('Create events', () => {
	afterEach(async () => {
		await events.deleteMany();
	});

	it('should create a event and return a identifier / POST /events', async () => {
		const { body, statusCode } = await request(app).post(ROUTE).send(fakeCreateEventRequest(false, { title: { de: 'New Event' } }));

		expect(statusCode).toBe(201);

		expect(body.data.eventIdentifier).toMatch(IDENTIFIER_REG_EX);
		let loc = await events.findOne({ identifier: body.data.eventIdentifier });
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
		const { body, statusCode } = await request(app).get(ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(3);
		for (const o of body.data.events) {
			expect(validateEvent(o).isValid).toBe(true);
		}
	});

	it('should return a empty list / GET /events', async () => {
		await events.deleteMany();

		const { body, statusCode } = await request(app).get(ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(0);
	});

	it('should return an error when an invalid ID is provided / GET /events/invalidID', async () => {
		const { body, statusCode } = await request(app).get(ROUTE + '/invalidID');

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe('Resource Not Found');
	});

	it('should return a single event / GET /events/existID', async () => {
		const { body, statusCode } = await request(app).get(ROUTE + '/1234-5678-9101-1121');

		expect(statusCode).toBe(200);
		expect(validateEvent(body.data.event).isValid).toBe(true);
		expect(body.data.event.identifier).toBe('1234-5678-9101-1121');
		expect(body.data.event.title.de).toBe('Konzert in Berlin');
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
	  const { body, statusCode } = await request(app).patch(ROUTE +'/1234-5678-9101-1121').send({
				title: { de :'Neuer Name' }
		  });

	  expect(statusCode).toBe(200);
	  let loc = await events.findOne({identifier: '1234-5678-9101-1121'});
	  expect(loc?.title.de).toBe('Neuer Name');
	});
  
	it('should return an error when an invalid ID is provided / PATCH /events/invalidID', async () => {
	  const { body, statusCode } = await request(app).patch(ROUTE +'/invalidID').send({
			  title: { de :'Neuer Name' }
		  });
  
	  expect(statusCode).toBe(400);
	  expect(body.error.message).toBe('Bad Request');
	});
  });
  


let con: MongoClient;
let mongoServer: MongoMemoryServer;
let connector: MongoDBConnector;
let app: express.Application;
let events: Collection;

const ROUTE = '/events';

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
	app.use(ROUTE, eventsRoutes.getRouter());
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
