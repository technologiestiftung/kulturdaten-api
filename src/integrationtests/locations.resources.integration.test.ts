
import request from "supertest";

import { TestEnvironment } from './integrationtestutils/TestEnvironment';
import { validateLocation } from '../generated/models/Location.generated';
import { fakeCreateLocationRequest } from '../generated/faker/faker.CreateLocationRequest.generated';
import { LOCATION_IDENTIFIER_REG_EX } from './integrationtestutils/testmatcher';

import threeDummyLocations from './testdata/locations.json';

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withLocationsRoutes();
});

afterAll(async () => {
	await env.stopServer();
});


describe('Validate testData', () => {
	beforeEach(async () => {
		await env.locations.insertMany(threeDummyLocations);
	});

	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it('should validate the test data', async () => {
		const locationDocuments = await env.locations.find().toArray();
		for (const o of locationDocuments) {
			expect(validateLocation(o).isValid).toBe(true);
		}
	});
});

describe('Create locations', () => {
	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it('should create a location and return an identifier / POST /locations', async () => {
		const { body, statusCode } = await request(env.app).post(env.LOCATIONS_ROUTE).set('Authorization', `Bearer `+env.USER_TOKEN).send(fakeCreateLocationRequest(false, { title: { de: 'New Location' } }));
	
		expect(statusCode).toBe(201);
	
		const newLocationID = body.data.locationReference.referenceId;
		expect(newLocationID).toMatch(LOCATION_IDENTIFIER_REG_EX);
		let loc = await env.locations.findOne({ identifier: newLocationID });
	
		expect(loc?.title.de).toBe('New Location');
	});
	
});


describe('Read locations', () => {
	beforeEach(async () => {
		await env.locations.insertMany(threeDummyLocations);
	});

	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it('should return a list of all locations / GET /locations', async () => {
		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.locations).toHaveLength(3);
		for (const o of body.data.locations) {
			expect(validateLocation(o).isValid).toBe(true);
		}
	});

	it('should return a empty list / GET /locations', async () => {
		await env.locations.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.locations).toHaveLength(0);
	});

	it('should return an error when an invalid ID is provided / GET /locations/invalidID', async () => {
		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE + '/invalidID');

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe('Resource Not Found');
	});

	it('should return a single location / GET /locations/existID', async () => {
		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE + '/LOC-12345678');

		expect(statusCode).toBe(200);
		expect(validateLocation(body.data.location).isValid).toBe(true);
		expect(body.data.location.identifier).toBe('LOC-12345678');
		expect(body.data.location.title.de).toBe('Berliner Historisches Museum');
	});
});


describe('Update locations', () => {
	beforeEach(async () => {
	  await env.locations.insertMany(threeDummyLocations);
	});
  
	afterEach(async () => {
	  await env.locations.deleteMany();
	});
  
	it('should update the name of a location / PATCH /locations/existID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.LOCATIONS_ROUTE +'/LOC-12345678').set('Authorization', `Bearer `+env.USER_TOKEN).send({
				title: { de :'Neuer Name' }
		  });

	  expect(statusCode).toBe(200);
	  let loc = await env.locations.findOne({identifier: 'LOC-12345678'});
	  expect(loc?.title.de).toBe('Neuer Name');
	});
  
	it('should return an error when an invalid ID is provided / PATCH /locations/invalidID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.LOCATIONS_ROUTE +'/invalidID').set('Authorization', `Bearer `+env.USER_TOKEN).send({
			  title: { de :'Neuer Name' }
		  });
  
	  expect(statusCode).toBe(400);
	  expect(body.error.message).toBe('Bad Request');
	});
  });
  

  describe('Search locations', () => {
	beforeEach(async () => {
	  await env.locations.insertMany(threeDummyLocations);
	});
  
	afterEach(async () => {
	  await env.locations.deleteMany();
	});
  
	it('should return 2 locations with tag Bühne  / POST /locations/search', async () => {
	  const { body, statusCode } = await request(env.app).post(env.LOCATIONS_ROUTE +'/search').send({
			"searchFilter":{"tags":{"$in":["Bühne"]}}
		});

	  expect(statusCode).toBe(200);
	  expect(body.data.locations).toHaveLength(2);
	  expect(body.data.locations[0].tags).toContain('Bühne');
	  expect(body.data.locations[1].tags).toContain('Bühne');
	});
  });