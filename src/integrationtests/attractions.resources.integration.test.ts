
import request from "supertest";

import { TestEnvironment } from './integrationtestutils/TestEnvironment';
import { validateAttraction } from '../generated/models/Attraction.generated';
import { fakeCreateAttractionRequest } from '../generated/faker/faker.CreateAttractionRequest.generated';
import { IDENTIFIER_REG_EX } from './integrationtestutils/testmatcher';

import threeDummyAttractions from './testdata/attractions.json';

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withAttractionsRoutes();
});

afterAll(async () => {
	await env.stopServer();
});


describe('Validate testData', () => {
	beforeEach(async () => {
		await env.attractions.insertMany(threeDummyAttractions);
	});

	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it('should validate the test data', async () => {
		const attractionDocuments = await env.attractions.find().toArray();
		for (const o of attractionDocuments) {
			expect(validateAttraction(o).isValid).toBe(true);
		}
	});
});

describe('Create attractions', () => {
	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it('should create a attraction and return a identifier / POST /attractions', async () => {
		const { body, statusCode } = await request(env.app).post(env.ATTRACTIONS_ROUTE).send(fakeCreateAttractionRequest(false, { title: { de: 'New Attraction' } }));

		expect(statusCode).toBe(201);

		expect(body.data.attractionIdentifier).toMatch(IDENTIFIER_REG_EX);
		let loc = await env.attractions.findOne({ identifier: body.data.attractionIdentifier });

		expect(loc?.title.de).toBe('New Attraction');
	});
});


describe('Read attractions', () => {
	beforeEach(async () => {
		await env.attractions.insertMany(threeDummyAttractions);
	});

	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it('should return a list of all attractions / GET /attractions', async () => {
		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.attractions).toHaveLength(3);
		for (const o of body.data.attractions) {
			expect(validateAttraction(o).isValid).toBe(true);
		}
	});

	it('should return a empty list / GET /attractions', async () => {
		await env.attractions.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.attractions).toHaveLength(0);
	});

	it('should return an error when an invalid ID is provided / GET /attractions/invalidID', async () => {
		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE + '/invalidID');

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe('Resource Not Found');
	});

	it('should return a single attraction / GET /attractions/existID', async () => {
		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE + '/skywalkers-observatory-12345');

		expect(statusCode).toBe(200);
		expect(validateAttraction(body.data.attraction).isValid).toBe(true);
		expect(body.data.attraction.identifier).toBe('skywalkers-observatory-12345');
		expect(body.data.attraction.title.de).toBe('Skywalkers Observatorium');
	});
});


describe('Update attractions', () => {
	beforeEach(async () => {
	  await env.attractions.insertMany(threeDummyAttractions);
	});
  
	afterEach(async () => {
	  await env.attractions.deleteMany();
	});
  
	it('should update the name of a attraction / PATCH /attractions/existID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.ATTRACTIONS_ROUTE +'/skywalkers-observatory-12345').send({
				title: { de :'Neuer Name' }
		  });

	  expect(statusCode).toBe(200);
	  let loc = await env.attractions.findOne({identifier: 'skywalkers-observatory-12345'});
	  expect(loc?.title.de).toBe('Neuer Name');
	});
  
	it('should return an error when an invalid ID is provided / PATCH /attractions/invalidID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.ATTRACTIONS_ROUTE +'/invalidID').send({
			  title: { de :'Neuer Name' }
		  });
  
	  expect(statusCode).toBe(400);
	  expect(body.error.message).toBe('Bad Request');
	});
  });
  

