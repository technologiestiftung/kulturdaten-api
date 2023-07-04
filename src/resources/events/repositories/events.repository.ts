import debug from 'debug';
import { Event } from '../../../generated/models/Event.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';
import { AddEventLocationRequest } from '../../../generated/models/AddEventLocationRequest.generated';
import { RemoveEventLocationRequest } from '../../../generated/models/RemoveEventLocationRequest.generated';
import { AddEventAttractionRequest } from '../../../generated/models/AddEventAttractionRequest.generated';
import { RemoveEventAttractionRequest } from '../../../generated/models/RemoveEventAttractionRequest.generated';
import { SetEventOrganizerRequest } from '../../../generated/models/SetEventOrganizerRequest.generated';
import { RescheduleEventRequest } from '../../../generated/models/RescheduleEventRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';


const log: debug.IDebugger = debug('app:events-repository');

export interface EventsRepository {
	searchDuplicates(event: Event): Promise<Event[]>;

	addEvent(createEvent: CreateEventRequest): Promise<string>;

	getEvents(limit:number, page:number) : Promise<Event[] | null>;

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


