import debug from 'debug';
import { Event } from '../../../generated/models/Event.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';
import { RescheduleEventRequest } from '../../../generated/models/RescheduleEventRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { Filter } from '../../../generated/models/Filter.generated';
import { Pagination } from '../../../common/parameters/Pagination';


const log: debug.IDebugger = debug('app:events-repository');

export interface EventsRepository {

	getEvents( pagination?: Pagination) : Promise<Event[]>;

	getEventsAsReferences(pagination?: Pagination) : Promise<Reference[]>;

	searchEvents(filter?: Filter, pagination?: Pagination): Promise<Event[]>;

	searchAllEvents(filter: Filter, projection? : object) : Promise<Event[]>;
	
	countEvents(filter?: Filter): Promise<number>;

	getEventReferenceByIdentifier(id: string): Promise<Reference | null>;

	searchDuplicates(event: Event): Promise<Event[]>;

	addEvent(createEvent: CreateEventRequest): Promise<Reference | null>;


	getEventByIdentifier(eventId: string) : Promise<Event | null>;

	updateEventById(eventId: string, eventFields: UpdateEventRequest ): Promise<boolean>;

	removeEventById(eventId: string) :  Promise<boolean>;

	addEventLocation(eventId: string, locationReference: Reference)  :  Promise<boolean>;

	removeEventLocation(eventId: string, locationId: string): Promise<boolean>;

	addEventAttraction(eventId: string, attractionReference: Reference) : Promise<boolean>;

	removeEventAttraction(eventId: string, attractionId: string) : Promise<boolean>;

	setEventOrganizer(eventId: string,  organizerReference: Reference): Promise<boolean>;

	deleteEventOrganizer(eventId: string): Promise<boolean>;

	setEventStatus(eventId: string, status: Event['status']): Promise<boolean>;

	setScheduleStatus(eventId: string, status: Event['scheduleStatus']): Promise<boolean>;

	reschedule(eventId: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean>
}


