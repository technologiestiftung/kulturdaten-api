import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { EventsController } from './controllers/events.controller';
import { CreateEventRequest } from '../../generated/models/CreateEventRequest.generated';
import { UpdateEventRequest } from '../../generated/models/UpdateEventRequest.generated';
import { RescheduleEventRequest } from '../../generated/models/RescheduleEventRequest.generated';
import { AddEventLocationRequest } from '../../generated/models/AddEventLocationRequest.generated';
import { RemoveEventLocationRequest } from '../../generated/models/RemoveEventLocationRequest.generated';
import { AddEventAttractionRequest } from '../../generated/models/AddEventAttractionRequest.generated';
import { RemoveEventAttractionRequest } from '../../generated/models/RemoveEventAttractionRequest.generated';
import { SetEventOrganizerRequest } from '../../generated/models/SetEventOrganizerRequest.generated';
import { SearchEventsRequest } from '../../generated/models/SearchEventsRequest.generated';
import { getPagination } from '../../utils/RequestUtil';


const log: debug.IDebugger = debug('app:events-routes');

@Service()
export class EventsRoutes {

	constructor(public eventsController: EventsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get('/', (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference;
				const { page, pageSize} = getPagination(req);

				if (asReference) {
					this.eventsController.listEventsAsReference(res, page, pageSize);
				} else {
					this.eventsController.listEvents(res, page, pageSize);
				}
			})
			.post('/', (req: express.Request, res: express.Response) => {
				const createEventRequest = req.body as CreateEventRequest;
				this.eventsController.createEvent(res, createEventRequest);
			});

		router
			.post('/bulk-create', (req: express.Request, res: express.Response) => {
				const createEventsRequest = req.body as CreateEventRequest[];
				
				this.eventsController.createEvents(res, createEventsRequest);
			});	

		router
			.post('/search', (req: express.Request, res: express.Response) => {
				const { page, pageSize} = getPagination(req);

				const searchEventsRequest = req.body as SearchEventsRequest;
				this.eventsController.searchEvents(res, searchEventsRequest, page, pageSize);
			});

		router
			.get('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if(asReference) {
					this.eventsController.getEventReferenceById(res, identifier);
				} else {
					this.eventsController.getEventById(res, identifier);
				}
			})
			.patch('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const updateEventRequest = req.body as UpdateEventRequest;
				this.eventsController.updateEvent(res, identifier, updateEventRequest);
			});

		router
			.put('/:identifier/locations', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const addEventLocationRequest = req.body as AddEventLocationRequest;
				this.eventsController.addEventLocation(res, identifier, addEventLocationRequest);
			})
			.delete('/:identifier/locations', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const removeEventLocationRequest = req.body as RemoveEventLocationRequest;
				this.eventsController.removeEventLocation(res, identifier, removeEventLocationRequest);
			});

		router
			.put('/:identifier/attractions', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const addEventAttractionRequest = req.body as AddEventAttractionRequest;
				this.eventsController.addEventAttraction(res, identifier, addEventAttractionRequest);
			})
			.delete('/:identifier/attractions', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const removeEventAttractionRequest = req.body as RemoveEventAttractionRequest;
				this.eventsController.removeEventAttraction(res, identifier, removeEventAttractionRequest);
			});

		router
			.put('/:identifier/organizer', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const setEventOrganizerRequest = req.body as SetEventOrganizerRequest;
				this.eventsController.setEventOrganizer(res, identifier, setEventOrganizerRequest);
			})
			.delete('/:identifier/organizer', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.deleteEventOrganizer(res, identifier);
			});

		router
			.post('/:identifier/publish', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.publishEvent(res, identifier);
			})
			.post('/:identifier/unpublish', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.unpublishEvent(res, identifier);
			});

		router
			.post('/:identifier/reschedule', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const rescheduleEventRequest = req.body as RescheduleEventRequest;
				this.eventsController.rescheduleEvent(res, identifier, rescheduleEventRequest);
			});

		router
			.post('/:identifier/postpone', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.postponeEvent(res, identifier);
			});

		router
			.post('/:identifier/cancel', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.cancelEvent(res, identifier);
			});

		router
			.post('/:identifier/archive', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.archiveEvent(res, identifier);
			})
			.post('/:identifier/unarchive', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.unarchiveEvent(res, identifier);
			});

		router
			.post('/:identifier/duplicate', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				this.eventsController.duplicateEvent(res, identifier);
			});

		return router;
	}
}
