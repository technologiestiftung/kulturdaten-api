import express from "express";
import request from "supertest";
import { OrganizersController } from "../organizers/controllers/organizers.controller";
import { OrganizersMiddleware } from "../organizers/middleware/organizers.middleware";
import { OrganizersService } from "../organizers/services/organizers.service";
import { OrganizersRoutes } from "../routes/organizers.routes";
import { DateUtil } from "../utils/DateUtil";
import { MockOrganizersRepository } from "./mocks/mock.organizers.repository";

const app = express();
app.use(express.json());

const organizersRepository = new MockOrganizersRepository();
organizersRepository.fillWithDummyOrganizers(5);
const organizersService = new OrganizersService(organizersRepository);
const organizersController = new OrganizersController(organizersService, new DateUtil());
const organizersMiddleware = new OrganizersMiddleware();
const organizersRoutes = new OrganizersRoutes(organizersController, organizersMiddleware);

app.use('/v1/organizers', organizersRoutes.getRouter());

describe('Exploring existing organizers', () => {
	it('GET /v1/organizers - success - get all the organizers', async () => {
		const { body, statusCode } = await request(app).get('/v1/organizers');

		expect(statusCode).toBe(200);
		expect(body.organizers).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					_id: expect.any(String),
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


});