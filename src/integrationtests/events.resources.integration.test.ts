
import request from "supertest";

import { TestEnvironment } from './integrationtestutils/TestEnvironment';
import { validateEvent } from '../generated/models/Event.generated';
import { fakeCreateEventRequest } from '../generated/faker/faker.CreateEventRequest.generated';
import { IDENTIFIER_REG_EX } from './integrationtestutils/testmatcher';

import threeDummyEvents from './testdata/events.json';

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withEventsRoutes();
});

afterAll(async () => {
	await env.stopServer();
});


describe('Validate testData', () => {
	beforeEach(async () => {
		await env.events.insertMany(threeDummyEvents);
	});

	afterEach(async () => {
		await env.events.deleteMany();
	});

	it('should validate the test data', async () => {
		const eventDocuments = await env.events.find().toArray();
		for (const o of eventDocuments) {
			expect(validateEvent(o).isValid).toBe(true);
		}
	});
});

describe('Create events', () => {
	afterEach(async () => {
		await env.events.deleteMany();
	});

	it('should create a event and return a identifier / POST /events', async () => {
		const { body, statusCode } = await request(env.app).post(env.EVENTS_ROUTE).send(fakeCreateEventRequest(false, { title: { de: 'New Event' } }));

		expect(statusCode).toBe(201);

		expect(body.data.eventIdentifier).toMatch(IDENTIFIER_REG_EX);
		let loc = await env.events.findOne({ identifier: body.data.eventIdentifier });
		expect(loc?.title.de).toBe('New Event');
	});
});


describe('Read events', () => {
	beforeEach(async () => {
		await env.events.insertMany(threeDummyEvents);
	});

	afterEach(async () => {
		await env.events.deleteMany();
	});

	it('should return a list of all events / GET /events', async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(3);
		for (const o of body.data.events) {
			expect(validateEvent(o).isValid).toBe(true);
		}
	});

	it('should return a empty list / GET /events', async () => {
		await env.events.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(0);
	});

	it('should return an error when an invalid ID is provided / GET /events/invalidID', async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE + '/invalidID');

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe('Resource Not Found');
	});

	it('should return a single event / GET /events/existID', async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE + '/1234-5678-9101-1121');

		expect(statusCode).toBe(200);
		expect(validateEvent(body.data.event).isValid).toBe(true);
		expect(body.data.event.identifier).toBe('1234-5678-9101-1121');
		expect(body.data.event.title.de).toBe('Konzert in Berlin');
	});
});


describe('Update events', () => {
	beforeEach(async () => {
	  await env.events.insertMany(threeDummyEvents);
	});
  
	afterEach(async () => {
	  await env.events.deleteMany();
	});
  
	it('should update the name of a event / PATCH /events/existID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.EVENTS_ROUTE +'/1234-5678-9101-1121').send({
				title: { de :'Neuer Name' }
		  });

	  expect(statusCode).toBe(200);
	  let loc = await env.events.findOne({identifier: '1234-5678-9101-1121'});
	  expect(loc?.title.de).toBe('Neuer Name');
	});
  
	it('should return an error when an invalid ID is provided / PATCH /events/invalidID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.EVENTS_ROUTE +'/invalidID').send({
			  title: { de :'Neuer Name' }
		  });
  
	  expect(statusCode).toBe(400);
	  expect(body.error.message).toBe('Bad Request');
	});
  });
  

