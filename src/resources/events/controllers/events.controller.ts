import express from 'express';
import { EventsService } from '../services/events.service';
import debug from 'debug';
import { Service } from 'typedi';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';
import { AddEventLocationRequest } from '../../../generated/models/AddEventLocationRequest.generated';
import { RemoveEventLocationRequest } from '../../../generated/models/RemoveEventLocationRequest.generated';
import { AddEventAttractionRequest } from '../../../generated/models/AddEventAttractionRequest.generated';
import { RemoveEventAttractionRequest } from '../../../generated/models/RemoveEventAttractionRequest.generated';
import { SetEventOrganizerRequest } from '../../../generated/models/SetEventOrganizerRequest.generated';
import { RescheduleEventRequest } from '../../../generated/models/RescheduleEventRequest.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { SearchEventsRequest } from '../../../generated/models/SearchEventsRequest.generated';
import { ErrorResponseBuilder, SuccessResponseBuilder } from '../../../common/responses/response.builders';

const log: debug.IDebugger = debug('app:events-controller');

@Service()
export class EventsController {

	constructor(
		public eventsService: EventsService) { }

	async listEvents(res: express.Response) {
		const events = await this.eventsService.list(100, 0);
		if (events) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ events: events }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Events not found").build());
		}
	}

	async getEventById(res: express.Response, eventId: string) {
		const event = await this.eventsService.readById(eventId);
		if (event) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ event: event }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Event not found").build());
		}
	}

	async createEvent(res: express.Response, createEvent: CreateEventRequest) {
		const eventId = await this.eventsService.create(createEvent);
		if (eventId) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ identifier: eventId } ).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An event cannot be created with the data.").build());
		}
	}

	duplicateEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	unarchiveEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	archiveEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	cancelEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	postponeEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	rescheduleEvent(res: express.Response<any, Record<string, any>>, identifier: string, rescheduleEventRequest: RescheduleEventRequest) {
		throw new Error('Method not implemented.');
	}
	unpublishEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	publishEvent(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	deleteEventOrganizer(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	setEventOrganizer(res: express.Response<any, Record<string, any>>, identifier: string, setEventOrganizerRequest: SetEventOrganizerRequest) {
		throw new Error('Method not implemented.');
	}
	removeEventAttraction(res: express.Response<any, Record<string, any>>, identifier: string, removeEventAttractionRequest: RemoveEventAttractionRequest) {
		throw new Error('Method not implemented.');
	}
	addEventAttraction(res: express.Response<any, Record<string, any>>, identifier: string, addEventAttractionRequest: AddEventAttractionRequest) {
		throw new Error('Method not implemented.');
	}
	removeEventLocation(res: express.Response<any, Record<string, any>>, identifier: string, removeEventLocationRequest: RemoveEventLocationRequest) {
		throw new Error('Method not implemented.');
	}
	addEventLocation(res: express.Response<any, Record<string, any>>, identifier: string, addEventLocationRequest: AddEventLocationRequest) {
		throw new Error('Method not implemented.');
	}
	updateEvent(res: express.Response<any, Record<string, any>>, identifier: string, updateEventRequest: UpdateEventRequest) {
		throw new Error('Method not implemented.');
	}
	searchEvents(res: express.Response<any, Record<string, any>>, searchEventsRequest: SearchEventsRequest) {
		throw new Error('Method not implemented.');
	}

}
