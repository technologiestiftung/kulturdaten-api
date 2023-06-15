import debug from 'debug';
import { Event } from '../../../generated/models/Event.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';


const log: debug.IDebugger = debug('app:events-repository');

export interface EventsRepository {
	searchDuplicates(event: Event): Promise<Event[]>;

	addEvent(createEvent: CreateEventRequest): Promise<string>;

	getEvents(limit:number, page:number) : Promise<Event[] | null>;

	getEventByIdentifier(eventId: string) : Promise<Event | null>;

	updateEventById(eventId: string, eventFields: UpdateEventRequest ): Promise<boolean>;

	removeEventById(eventId: string) :  Promise<boolean>;
}


