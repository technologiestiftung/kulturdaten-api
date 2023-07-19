
import request from "supertest";

import { TestEnvironment } from './integrationtestutils/TestEnvironment';
import { validateOrganization } from '../generated/models/Organization.generated';
import { fakeCreateOrganizationRequest } from '../generated/faker/faker.CreateOrganizationRequest.generated';
import { IDENTIFIER_REG_EX } from './integrationtestutils/testmatcher';

import threeDummyOrganizations from './testdata/organizations.json';

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withOrganizationsRoutes();
});

afterAll(async () => {
	await env.stopServer();
});


describe('Validate testData', () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it('should validate the test data', async () => {
		const organizationDocuments = await env.organizations.find().toArray();
		for (const o of organizationDocuments) {
			expect(validateOrganization(o).isValid).toBe(true);
		}
	});
});

describe('Create organizations', () => {
	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it('should create an organization and return an identifier / POST /organizations', async () => {
		const { body, statusCode } = await request(env.app).post(env.ORGANIZATIONS_ROUTE).send(fakeCreateOrganizationRequest(false, { title: { de: 'New Organization' } }));
	
		expect(statusCode).toBe(201);
	
		const newOrganizationID = body.data.organizationReference.referenceId;
		expect(newOrganizationID).toMatch(IDENTIFIER_REG_EX);
		let loc = await env.organizations.findOne({ identifier: newOrganizationID });
	
		expect(loc?.title.de).toBe('New Organization');
	});
	
});


describe('Read organizations', () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it('should return a list of all organizations / GET /organizations', async () => {
		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.organizations).toHaveLength(3);
		for (const o of body.data.organizations) {
			expect(validateOrganization(o).isValid).toBe(true);
		}
	});

	it('should return a empty list / GET /organizations', async () => {
		await env.organizations.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.organizations).toHaveLength(0);
	});

	it('should return an error when an invalid ID is provided / GET /organizations/invalidID', async () => {
		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE + '/invalidID');

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe('Resource Not Found');
	});

	it('should return a single organization / GET /organizations/existID', async () => {
		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE + '/temporal-cultural-exchange-45123');

		expect(statusCode).toBe(200);
		expect(validateOrganization(body.data.organization).isValid).toBe(true);
		expect(body.data.organization.identifier).toBe('temporal-cultural-exchange-45123');
		expect(body.data.organization.title.de).toBe('Zeitreisende Kulturelle Austauschorganisation');
	});
});


describe('Update organizations', () => {
	beforeEach(async () => {
	  await env.organizations.insertMany(threeDummyOrganizations);
	});
  
	afterEach(async () => {
	  await env.organizations.deleteMany();
	});
  
	it('should update the name of a organization / PATCH /organizations/existID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.ORGANIZATIONS_ROUTE +'/temporal-cultural-exchange-45123').send({
				title: { de :'Neuer Name' }
		  });

	  expect(statusCode).toBe(200);
	  let loc = await env.organizations.findOne({identifier: 'temporal-cultural-exchange-45123'});
	  expect(loc?.title.de).toBe('Neuer Name');
	});
  
	it('should return an error when an invalid ID is provided / PATCH /organizations/invalidID', async () => {
	  const { body, statusCode } = await request(env.app).patch(env.ORGANIZATIONS_ROUTE +'/invalidID').send({
			  title: { de :'Neuer Name' }
		  });
  
	  expect(statusCode).toBe(400);
	  expect(body.error.message).toBe('Bad Request');
	});
  });
  

