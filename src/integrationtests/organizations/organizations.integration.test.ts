import express from "express";
import request from "supertest";
import { OrganizationsController } from "../../organizations/controllers/organizations.controller";
import { OrganizationsService } from "../../organizations/services/organizations.service";
import { OrganizationsRoutes } from "../../organizations/organizations.routes";
import { MockOrganizationsRepository, dummyOrganization } from "./mocks/mock.organizations.repository";

import { validateOrganization } from "../../generated/models/Organization.generated";

const app = express();
app.use(express.json());

const organizationsRepository = new MockOrganizationsRepository();
organizationsRepository.fillWithDummyOrganizations(5);
const organizationsService = new OrganizationsService(organizationsRepository);
const organizationsController = new OrganizationsController(organizationsService);
const organizationsRoutes = new OrganizationsRoutes(organizationsController);


app.use('/v1/organizations', organizationsRoutes.getRouter());


describe('Exploring existing organizations', () => {
	it('GET /v1/organizations - success - get all the organizations', async () => {
		const { body, statusCode } = await request(app).get('/v1/organizations');

		expect(statusCode).toBe(200);

		body.organizations.forEach((o: object) => {
			expect(validateOrganization(o).isValid).toBe(true);
		});
	});


	it('POST /v1/organizations - success - get new organizationId', async () => {
		const { body, statusCode } = await request(app).post('/v1/organizations').send({
			name: 'Neuer Veranstalter',
			description: 'Beschreibung'
		});

		expect(statusCode).toBe(201);

		expect(body).toEqual(expect.objectContaining({
			identifier: expect.any(String),
		}));
	});

	it('GET /v1/organizations/:organizationId - failure when organization is not found', async () => {
		const { body, statusCode } = await request(app).get('/v1/organizations/wrongID');

		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Organization not found'
			}
		});
	});

	it('GET /v1/organizations/:organizationId - get the organization', async () => {
		const existOrganizationId = organizationsRepository.addDummyOrganization();

		const { body, statusCode } = await request(app).get(`/v1/organizations/${existOrganizationId}`);

		expect(statusCode).toBe(200);

		expect(body.organization).toEqual(expect.objectContaining({
			identifier: existOrganizationId,
			name: expect.any(String),
			createdAt: expect.any(String),
			updatedAt: expect.any(String),
		}));
	});

	it('PATCH /v1/organizations/:organizationId - failure when organization is not found', async () => {
		const { body, statusCode } = await request(app).patch('/v1/organizations/wrongID').send({
			name: 'Neuer Name',
		});
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Organization not found'
			}
		});
	});

	it('PATCH /v1/organizations/:organizationId -  success - organization is updated and code 204', async () => {
		const existOrganizationId: string = organizationsRepository.addDummyOrganization() || '';

		const { statusCode } = await request(app).patch(`/v1/organizations/${existOrganizationId}`).send({
			name: 'Neuer Name',
		});

		const existOrganization = await organizationsRepository.getOrganizationByIdentifier(existOrganizationId);
		expect(existOrganization?.name).toBe('Neuer Name');
		expect(statusCode).toBe(204);
	});


	it('DELETE /v1/organizations/:organizationId - failure when organization is not found', async () => {
		const { body, statusCode } = await request(app).delete('/v1/organizations/wrongID');
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Organization not found'
			}
		});
	});

	it('DELETE /v1/organizations/:organizationId -  success - organization is updated and code 204', async () => {
		const existOrganizationId: string = organizationsRepository.addDummyOrganization() || '';

		const { statusCode } = await request(app).delete(`/v1/organizations/${existOrganizationId}`);

		const existOrganization = await organizationsRepository.getOrganizationByIdentifier("86576");
		expect(existOrganization).toBeNull();
		expect(statusCode).toBe(204);
	});

});

