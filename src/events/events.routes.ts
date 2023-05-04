import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { EventsController } from './controllers/events.controller';
import { CreateEvent } from '../generated/models/CreateEvent.generated';
import { PatchEvent } from '../generated/models/PatchEvent.generated';


const log: debug.IDebugger = debug('app:events-routes');

@Service()
export class EventsRoutes {

	constructor(
		public eventsController: EventsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				(req: express.Request, res: express.Response) => {
					this.eventsController.listEvents(res);
				})
			.post(
				'/',
				(req: express.Request, res: express.Response) => {
					const createEvent = req.body as CreateEvent;
					this.eventsController.createEvent(res, createEvent);
				});

		router
			.get(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.getEventById(res, identifier);
				})
			.patch(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const patchEvent = req.body as PatchEvent;
					this.eventsController.patch(res, identifier, patchEvent);
				})
			.delete(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.eventsController.removeEvent(res, identifier);
				});


		return router;
	}
}
