import express from 'express';
import { EventsService } from '../services/events.service';
import debug from 'debug';
import { Service } from 'typedi';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';
import { AddEventLocationRequest } from '../../../generated/models/AddEventLocationRequest.generated';
import { RemoveEventLocationRequest } from '../../../generated/models/RemoveEventLocationRequest.generated';
import { SetEventOrganizerRequest } from '../../../generated/models/SetEventOrganizerRequest.generated';
import { RescheduleEventRequest } from '../../../generated/models/RescheduleEventRequest.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { SearchEventsRequest } from '../../../generated/models/SearchEventsRequest.generated';
import { ErrorResponseBuilder, SuccessResponseBuilder } from '../../../common/responses/response.builders';
import { SearchEventsResponse } from '../../../generated/models/SearchEventsResponse.generated';
import { AddEventAttractionRequest } from '../../../generated/models/AddEventAttractionRequest.generated';
import { RemoveEventAttractionRequest } from '../../../generated/models/RemoveEventAttractionRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';

const log: debug.IDebugger = debug('app:events-controller');

@Service()
export class EventsController {



	constructor(
		public eventsService: EventsService) { }

	async listEvents(res: express.Response, page: number, pageSize: number) {
		const events = await this.eventsService.list(page, pageSize);
		const totalCount = await this.eventsService.countEvents();
		res.status(200).send(new SuccessResponseBuilder().okResponse(
			{ 	
				page: page,
				pageSize: pageSize,
				totalCount: totalCount,
				events: events 
			}).build());
	}

	async listEventsAsReference(res: express.Response, page: number, pageSize: number) {
		const eventsReferences = await this.eventsService.listAsReferences(page, pageSize);
		const totalCount = await this.eventsService.countEvents();
		res.status(200).send(new SuccessResponseBuilder().okResponse(
			{ 
				page: page,
				pageSize: pageSize,
				totalCount: totalCount,
				eventsReferences: eventsReferences 
			}).build());
	}

	async searchEvents(res: express.Response, searchEventsRequest: SearchEventsRequest, page: number, pageSize: number) {
		const { events:events, page: rPage, pageSize: rPageSize, totalCount: totalCount } = await this.eventsService.search(searchEventsRequest, page, pageSize);
		if (events) {
			res.status(200).send(new SuccessResponseBuilder<SearchEventsResponse>().okResponse(
				{ 
					page: rPage,
					pageSize: rPageSize,
					totalCount: totalCount,
					events: events 
				}).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("No events matched the search criteria").build());
		}
	}

	async createEvent(res: express.Response, createEvent: CreateEventRequest) {
		const eventReference = await this.eventsService.create(createEvent);
		if (eventReference) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ eventReference: eventReference }).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An event cannot be created with the data.").build());
		}
	
	}

	async createEvents(res: express.Response, createEventRequest: CreateEventRequest[]) {
		const eventsReferences :  Promise<Reference | null> [] = [];
		createEventRequest.forEach(async request => {
			eventsReferences.push(this.eventsService.create(request));
		});
		const eR = await Promise.all(eventsReferences)
	
		res.status(201).send(new SuccessResponseBuilder().okResponse({ events: eR }).build());
	  }

	public async duplicateEvent(res: express.Response, identifier: string): Promise<void> {
        const eventId = await this.eventsService.duplicate(identifier);
        if (eventId) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ eventIdentifier: eventId } ).build());
        } else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Failed to duplicate the event").build());
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

	async getEventReferenceById(res: express.Response, identifier: string) {
		const eventReference = await this.eventsService.readReferenceById(identifier);
		if(eventReference){
			res.status(200).send(new SuccessResponseBuilder().okResponse({ eventReference: eventReference }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Event not found").build());
		}
	}

	async updateEvent(res: express.Response, identifier: string, updateEventRequest: UpdateEventRequest) {
		const isUpdated = await this.eventsService.update(identifier, updateEventRequest);
		if (isUpdated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the event").build());
		}
	}


	async addEventLocation(res: express.Response, identifier: string, addEventLocationRequest: AddEventLocationRequest) {
		const isAdded = await this.eventsService.addEventLocation(identifier, addEventLocationRequest);
		if (isAdded) {
		  res.status(200).send();
		} else {
		  res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to add location to the event").build());
		}
	}

	async removeEventLocation(res: express.Response, identifier: string, removeEventLocationRequest: RemoveEventLocationRequest) {
		const isRemoved = await this.eventsService.removeEventLocation(identifier, removeEventLocationRequest);
		if (isRemoved) {
		  res.status(204).send();
		} else {
		  res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to remove location from the event").build());
		}
	}

	async addEventAttraction(res: express.Response, identifier: string, addEventAttractionRequest: AddEventAttractionRequest) {
		const isAdded = await this.eventsService.addEventAttraction(identifier, addEventAttractionRequest);
		if (isAdded) {
		  res.status(200).send();
		} else {
		  res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to add attraction to the event").build());
		}
	}

	async removeEventAttraction(res: express.Response, identifier: string, removeEventAttractionRequest: RemoveEventAttractionRequest) {
		const isRemoved = await this.eventsService.removeEventAttraction(identifier, removeEventAttractionRequest);
		if (isRemoved) {
		  res.status(204).send();
		} else {
		  res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to remove attraction from the event").build());
		}
	}

	async setEventOrganizer(res: express.Response, identifier: string, setEventOrganizerRequest: SetEventOrganizerRequest) {
        const isSet = await this.eventsService.setEventOrganizer(identifier, setEventOrganizerRequest);
        if (isSet) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to set the organizer for the event").build());
        }
	}

	async deleteEventOrganizer(res: express.Response, identifier: string) {
        const isDeleted = await this.eventsService.deleteEventOrganizer(identifier);
        if (isDeleted) {
            res.status(204).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to delete the organizer from the event").build());
        }
	}

	public async publishEvent(res: express.Response, identifier: string): Promise<void> {
        const isPublished = await this.eventsService.publish(identifier);
        if (isPublished) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to publish the event").build());
        }
    }

    public async unpublishEvent(res: express.Response, identifier: string): Promise<void> {
        const isUnpublished = await this.eventsService.unpublish(identifier);
        if (isUnpublished) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unpublish the event").build());
        }
    }





    public async archiveEvent(res: express.Response, identifier: string): Promise<void> {
        const isArchived = await this.eventsService.archive(identifier);
        if (isArchived) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to archive the event").build());
        }
    }

	public async unarchiveEvent(res: express.Response, identifier: string): Promise<void> {
        const isUnarchived = await this.eventsService.unarchive(identifier);
        if (isUnarchived) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unarchive the event").build());
        }
    }

    public async cancelEvent(res: express.Response, identifier: string): Promise<void> {
        const isCanceled = await this.eventsService.cancel(identifier);
        if (isCanceled) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to cancel the event").build());
        }
    }

    public async postponeEvent(res: express.Response, identifier: string): Promise<void> {
        const isPostponed = await this.eventsService.postpone(identifier);
        if (isPostponed) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to postpone the event").build());
        }
    }

    public async rescheduleEvent(res: express.Response, identifier: string, rescheduleEventRequest: RescheduleEventRequest): Promise<void> {
        const isRescheduled = await this.eventsService.reschedule(identifier, rescheduleEventRequest);
        if (isRescheduled) {
            res.status(200).send();
        } else {
            res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to reschedule the event").build());
        }
	}

}
