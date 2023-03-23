import express from "express";
import request from "supertest";
import { OrganizersController } from "../../organizers/controllers/organizers.controller";
import { OrganizersService } from "../../organizers/services/organizers.service";
import { OrganizersRoutes } from "../../organizers/organizers.routes";
import { DateUtil } from "../../utils/DateUtil";
import { MockOrganizersRepository } from "./mocks/mock.organizers.repository";

const app = express();
app.use(express.json());

const organizersRepository = new MockOrganizersRepository();
organizersRepository.fillWithDummyOrganizers(5);
const organizersService = new OrganizersService(organizersRepository);
const organizersController = new OrganizersController(organizersService, new DateUtil());
const organizersRoutes = new OrganizersRoutes(organizersController);

app.use('/v1/organizers', organizersRoutes.getRouter());


describe('Exploring existing organizers', () => {
	it('GET /v1/organizers - success - get all the organizers', async () => {
		const { body, statusCode } = await request(app).get('/v1/organizers');

		expect(statusCode).toBe(200);
		expect(body.organizers).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					name: expect.any(String),
					description: expect.any(String),
					created: expect.any(String),
					updated: expect.any(String),
				})
			])
		);
	});


	it('POST  /v1/organizers - failure on invalid post body', async () => {
		const { body, statusCode } = await await request(app).post('/v1/organizers').send({
			name: '',
			description: 'Beschreibung'
		});

		expect(statusCode).toBe(400);
		expect(body).toEqual({
			errors: [
				{
					location: 'body',
					msg: 'Organizer name is required',
					param: 'name',
					value: ''
				}
			]
		});
	});

	it('POST /v1/organizers - success - get new organizerId', async () => {
		const { body, statusCode } = await request(app).post('/v1/organizers').send({
			name: 'Neuer Veranstalter',
			description: 'Beschreibung'
		});

		expect(statusCode).toBe(201);

		expect(body).toEqual(expect.objectContaining({
			id: expect.any(String),
		}));
	});

	it('GET /v1/organizers/:organizerId - failure when organizer is not found', async () => {
		const { body, statusCode } = await request(app).get('/v1/organizers/wrongID');

		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Organizer not found'
			}
		});
	});

	it('GET /v1/organizers/:organizerId - get the organizer', async () => {
		const existOrganizerId = organizersRepository.addDummyOrganizer();

		const { body, statusCode } = await request(app).get(`/v1/organizers/${existOrganizerId}`);

		expect(statusCode).toBe(200);

		expect(body.organizer).toEqual(expect.objectContaining({
			id: existOrganizerId,
			name: expect.any(String),
			description: expect.any(String),
			created: expect.any(String),
			updated: expect.any(String),
		}));
	});

	it('PATCH /v1/organizers/:organizerId - failure when organizer is not found', async () => {
		const { body, statusCode } = await request(app).patch('/v1/organizers/wrongID').send({
			name: 'Neuer Name',
		});
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Organizer not found'
			}
		});
	});

	it('PATCH /v1/organizers/:organizerId -  success - organizer is updated and code 204', async () => {
		const existOrganizerId:string = organizersRepository.addDummyOrganizer() || '';

		const { statusCode } = await request(app).patch(`/v1/organizers/${existOrganizerId}`).send({
			name: 'Neuer Name',
		});

		const existOrganizer = await organizersRepository.getOrganizerById(existOrganizerId);
		expect(existOrganizer?.name).toBe('Neuer Name');
		expect(statusCode).toBe(204);
	});


	it('DELETE /v1/organizers/:organizerId - failure when organizer is not found', async () => {
		const { body, statusCode } = await request(app).delete('/v1/organizers/wrongID');
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Organizer not found'
			}
		});
	});

	it('DELETE /v1/organizers/:organizerId -  success - organizer is updated and code 204', async () => {
		const existOrganizerId:string = organizersRepository.addDummyOrganizer() || '';

		const { statusCode } = await request(app).delete(`/v1/organizers/${existOrganizerId}`);

		const existOrganizer = await organizersRepository.getOrganizerById("86576");
		expect(existOrganizer).toBeNull();
		expect(statusCode).toBe(204);
	});

});

