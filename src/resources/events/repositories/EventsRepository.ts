import debug from "debug";
import { CreateEventRequest } from "../../../generated/models/CreateEventRequest.generated";
import { Event } from "../../../generated/models/Event.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RescheduleEventRequest } from "../../../generated/models/RescheduleEventRequest.generated";
import { UpdateEventRequest } from "../../../generated/models/UpdateEventRequest.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { Pagination } from "../../../generated/models/Pagination.generated";

const log: debug.IDebugger = debug("app:events-repository");

export interface EventsRepository {
	getEvents(pagination?: Pagination, filter?: Filter): Promise<Event[]>;

	getEventsAsReferences(pagination?: Pagination, filter?: Filter): Promise<Reference[]>;

	searchEvents(filter?: Filter, pagination?: Pagination): Promise<Event[]>;

	searchAllEvents(filter: Filter, projection?: object): Promise<Event[]>;

	countEvents(filter?: Filter): Promise<number>;

	getEventReferenceByIdentifier(id: string): Promise<Reference | null>;

	searchDuplicates(event: Event): Promise<Event[]>;

	addEvent(createEvent: CreateEventRequest, creator?: AuthUser): Promise<Reference | null>;

	getEventByIdentifier(eventId: string): Promise<Event | null>;

	updateEventById(eventId: string, eventFields: UpdateEventRequest): Promise<boolean>;

	removeEventById(eventId: string): Promise<boolean>;

	addEventLocation(eventId: string, locationReference: Reference): Promise<boolean>;

	removeEventLocation(eventId: string, locationId: string): Promise<boolean>;

	addEventAttraction(eventId: string, attractionReference: Reference): Promise<boolean>;

	removeEventAttraction(eventId: string, attractionId: string): Promise<boolean>;

	setEventOrganizer(eventId: string, organizerReference: Reference): Promise<boolean>;

	deleteEventOrganizer(eventId: string): Promise<boolean>;

	setEventStatus(eventId: string, status: Event["status"]): Promise<boolean>;

	setScheduleStatus(eventId: string, status: Event["scheduleStatus"]): Promise<boolean>;

	reschedule(eventId: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean>;
}
