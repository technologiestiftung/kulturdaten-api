import debug from "debug";
import express from "express";
import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { AddEventAttractionRequest } from "../../../generated/models/AddEventAttractionRequest.generated";
import { AddEventLocationRequest } from "../../../generated/models/AddEventLocationRequest.generated";
import { RemoveEventAttractionRequest } from "../../../generated/models/RemoveEventAttractionRequest.generated";
import { RemoveEventLocationRequest } from "../../../generated/models/RemoveEventLocationRequest.generated";
import { RescheduleEventRequest } from "../../../generated/models/RescheduleEventRequest.generated";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";
import { SearchEventsResponse } from "../../../generated/models/SearchEventsResponse.generated";
import { SetEventOrganizerRequest } from "../../../generated/models/SetEventOrganizerRequest.generated";
import { UpdateEventRequest } from "../../../generated/models/UpdateEventRequest.generated";
import { EventsService } from "../services/EventsService";
import { CreateEventResponse } from "../../../generated/models/CreateEventResponse.generated";
import { DuplicateEventResponse } from "../../../generated/models/DuplicateEventResponse.generated";
import { GetEventResponse } from "../../../generated/models/GetEventResponse.generated";
import { ResourcePermissionController } from "../../auth/controllers/ResourcePermissionController";
import { Filter } from "../../../generated/models/Filter.generated";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { EventParams } from "../../../common/parameters/Params";
import { GetEventsResponse } from "../../../generated/models/GetEventsResponse.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Event } from "../../../generated/models/Event.generated";
import { getEditableByFilter } from "../../../utils/MetadataUtil";
import { FilterFactory } from "../../../common/filter/FilterFactory";

const log: debug.IDebugger = debug("app:events-controller");

@Service()
export class EventsController implements ResourcePermissionController {
	constructor(
		public eventsService: EventsService,
		@Inject("FilterFactory") public filterFactory: FilterFactory,
	) {}

	async listEvents(res: express.Response, pagination: Pagination, params?: EventParams) {
		const filter: Filter = this.getEventsFilter(params);

		const totalCount = await this.eventsService.countEvents(filter);

		const sendEventsResponse = (data: { events?: Event[]; eventsReferences?: Reference[] }) => {
			res.status(200).send(
				new SuccessResponseBuilder<GetEventsResponse>()
					.okResponse({
						page: pagination.page,
						pageSize: pagination.pageSize,
						totalCount: totalCount,
						...data,
					})
					.build(),
			);
		};

		if (params?.asReference) {
			const eventsReferences = await this.eventsService.listAsReferences(pagination, filter);
			sendEventsResponse({ eventsReferences });
		} else {
			const events = await this.eventsService.list(pagination, filter);
			sendEventsResponse({ events });
		}
	}

	async listEventsAsReference(res: express.Response, pagination: Pagination, organizedBy?: string) {
		const eventsReferences = await this.eventsService.listAsReferences(
			pagination,
			this.getOrganizedByFilter(organizedBy),
		);
		const totalCount = await this.eventsService.countEvents(this.getOrganizedByFilter(organizedBy));
		res.status(200).send(
			new SuccessResponseBuilder<GetEventsResponse>()
				.okResponse({
					page: pagination.page,
					pageSize: pagination.pageSize,
					totalCount: totalCount,
					eventsReferences: eventsReferences,
				})
				.build(),
		);
	}

	async searchEvents(res: express.Response, searchEventsRequest: SearchEventsRequest, pagination: Pagination) {
		const {
			events: events,
			pagination: rPagination,
			totalCount: totalCount,
		} = await this.eventsService.search(searchEventsRequest, pagination);
		if (events) {
			res.status(200).send(
				new SuccessResponseBuilder<SearchEventsResponse>()
					.okResponse({
						page: rPagination ? rPagination.page : 1,
						pageSize: rPagination ? rPagination.pageSize : totalCount,
						totalCount: totalCount,
						events: events,
					})
					.build(),
			);
		} else {
			res
				.status(404)
				.send(new ErrorResponseBuilder().notFoundResponse("No events matched the search criteria").build());
		}
	}

	async isExist(permissionFilter: Filter): Promise<boolean> {
		const totalCount = await this.eventsService.countEvents(permissionFilter);
		return totalCount > 0;
	}

	async createEvent(res: express.Response, createEvent: CreateEventRequest, authUser?: AuthUser) {
		const eventReference = await this.eventsService.create(createEvent, authUser);
		if (eventReference) {
			res
				.status(201)
				.send(new SuccessResponseBuilder<CreateEventResponse>().okResponse({ eventReference: eventReference }).build());
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("An event cannot be created with the data.").build());
		}
	}

	async createEvents(res: express.Response, createEventRequests: CreateEventRequest[], authUser?: AuthUser) {
		const promises = createEventRequests.map(async (request) => this.eventsService.create(request, authUser));
		const eventReferences = await Promise.all(promises);
		res.status(201).send(new SuccessResponseBuilder().okResponse({ events: eventReferences }).build());
	}

	public async duplicateEvent(res: express.Response, identifier: string): Promise<void> {
		const eventId = await this.eventsService.duplicate(identifier);
		if (eventId) {
			res
				.status(201)
				.send(new SuccessResponseBuilder<DuplicateEventResponse>().okResponse({ eventIdentifier: eventId }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Failed to duplicate the event").build());
		}
	}

	async getEventById(res: express.Response, eventId: string) {
		const event = await this.eventsService.readById(eventId);
		if (event) {
			res.status(200).send(new SuccessResponseBuilder<GetEventResponse>().okResponse({ event: event }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Event not found").build());
		}
	}

	async getEventReferenceById(res: express.Response, identifier: string) {
		const eventReference = await this.eventsService.readReferenceById(identifier);
		if (eventReference) {
			res
				.status(200)
				.send(new SuccessResponseBuilder<GetEventResponse>().okResponse({ eventReference: eventReference }).build());
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
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to add location to the event").build());
		}
	}

	async removeEventLocation(
		res: express.Response,
		identifier: string,
		removeEventLocationRequest: RemoveEventLocationRequest,
	) {
		const isRemoved = await this.eventsService.removeEventLocation(identifier, removeEventLocationRequest);
		if (isRemoved) {
			res.status(204).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to remove location from the event").build());
		}
	}

	async addEventAttraction(
		res: express.Response,
		identifier: string,
		addEventAttractionRequest: AddEventAttractionRequest,
	) {
		const isAdded = await this.eventsService.addEventAttraction(identifier, addEventAttractionRequest);
		if (isAdded) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to add attraction to the event").build());
		}
	}

	async removeEventAttraction(
		res: express.Response,
		identifier: string,
		removeEventAttractionRequest: RemoveEventAttractionRequest,
	) {
		const isRemoved = await this.eventsService.removeEventAttraction(identifier, removeEventAttractionRequest);
		if (isRemoved) {
			res.status(204).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to remove attraction from the event").build());
		}
	}

	async setEventOrganizer(
		res: express.Response,
		identifier: string,
		setEventOrganizerRequest: SetEventOrganizerRequest,
	) {
		const isSet = await this.eventsService.setEventOrganizer(identifier, setEventOrganizerRequest);
		if (isSet) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to set the organizer for the event").build());
		}
	}

	async deleteEventOrganizer(res: express.Response, identifier: string) {
		const isDeleted = await this.eventsService.deleteEventOrganizer(identifier);
		if (isDeleted) {
			res.status(204).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to delete the organizer from the event").build());
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

	public async rescheduleEvent(
		res: express.Response,
		identifier: string,
		rescheduleEventRequest: RescheduleEventRequest,
	): Promise<void> {
		const isRescheduled = await this.eventsService.reschedule(identifier, rescheduleEventRequest);
		if (isRescheduled) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to reschedule the event").build());
		}
	}

	private getOrganizedByFilter(organizedBy?: string) {
		return organizedBy ? { "organizer.referenceId": organizedBy } : {};
	}

	private getByLocationFilter(byLocation?: string) {
		return byLocation
			? {
					"locations.referenceId": byLocation,
			  }
			: {};
	}

	private getByAttractionFilter(byAttraction?: string) {
		return byAttraction
			? {
					"attractions.referenceId": byAttraction,
			  }
			: {};
	}

	private getEventsFilter(params?: EventParams): Filter {
		const filter: Filter = {
			...this.getOrganizedByFilter(params?.organizedBy),
			...getEditableByFilter(params?.editableBy),
			...this.getByLocationFilter(params?.byLocation),
			...this.getByAttractionFilter(params?.byAttraction),
		};

		return filter;
	}
}
