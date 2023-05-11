import express from "express";
import request from "supertest";
import { EventsController } from "../../events/controllers/events.controller";
import { EventsService } from "../../events/services/events.service";
import { EventsRoutes } from "../../events/events.routes";
import { MockEventsRepository } from "./mocks/mock.events.repository";

import { validateEvent } from "../../generated/models/Event.generated";

import Ajv from "ajv"
import addFormats from "ajv-formats"

const app = express();
app.use(express.json());

const eventsRepository = new MockEventsRepository();
eventsRepository.fillWithDummyEvents(5);
const eventsService = new EventsService(eventsRepository);
const eventsController = new EventsController(eventsService);
const eventsRoutes = new EventsRoutes(eventsController);

/*
app.use('/v1/events', eventsRoutes.getRouter());

beforeAll(() => {
	const ajv = new Ajv()
	addFormats(ajv)

});

describe('Exploring existing events', () => {
	it('GET /v1/events - success - get all the events', async () => {
		const { body, statusCode } = await request(app).get('/v1/events');

		expect(statusCode).toBe(200);

		body.events.forEach((o: object) => {
			expect(validateEvent(o).isValid).toBe(true);
		});
	});


	it('POST /v1/events - success - get new eventId', async () => {
		const { body, statusCode } = await request(app).post('/v1/events').send({
			name: 'Neuer Veranstalter',
			description: 'Beschreibung'
		});

		expect(statusCode).toBe(201);

		expect(body).toEqual(expect.objectContaining({
			identifier: expect.any(String),
		}));
	});

	it('GET /v1/events/:eventId - failure when event is not found', async () => {
		const { body, statusCode } = await request(app).get('/v1/events/wrongID');

		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Event not found'
			}
		});
	});

	it('GET /v1/events/:eventId - get the event', async () => {
		const existEventId = eventsRepository.addDummyEvent();

		const { body, statusCode } = await request(app).get(`/v1/events/${existEventId}`);

		expect(statusCode).toBe(200);

		expect(validateEvent(body.event).isValid).toBe(true);
	});

	it('PATCH /v1/events/:eventId - failure when event is not found', async () => {
		const { body, statusCode } = await request(app).patch('/v1/events/wrongID').send({
			title: 'Neuer Title',
		});
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Event not found'
			}
		});
	});

	it('PATCH /v1/events/:eventId -  success - event is updated and code 204', async () => {
		const existEventId: string = eventsRepository.addDummyEvent() || '';

		const { statusCode } = await request(app).patch(`/v1/events/${existEventId}`).send({
			title: 'Neuer Title',
		});

		const existEvent = await eventsRepository.getEventByIdentifier(existEventId);
		expect(existEvent?.title).toBe('Neuer Title');
		expect(statusCode).toBe(204);
	});


	it('DELETE /v1/events/:eventId - failure when event is not found', async () => {
		const { body, statusCode } = await request(app).delete('/v1/events/wrongID');
		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'Event not found'
			}
		});
	});

	it('DELETE /v1/events/:eventId -  success - event is updated and code 204', async () => {
		const existEventId: string = eventsRepository.addDummyEvent() || '';

		const { statusCode } = await request(app).delete(`/v1/events/${existEventId}`);

		const existEvent = await eventsRepository.getEventByIdentifier("86576");
		expect(existEvent).toBeNull();
		expect(statusCode).toBe(204);
	});

});

*/       