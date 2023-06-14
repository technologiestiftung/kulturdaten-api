import debug from 'debug';
import { CreateEvent } from '../../../generated/models/CreateEvent.generated';
import { Event } from '../../../generated/models/Event.generated';
import { PatchEvent } from '../../../generated/models/PatchEvent.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';


const log: debug.IDebugger = debug('app:events-repository');

export interface EventsRepository {
	searchDuplicates(event: Event): Promise<Event[]>;

	addEvent(createEvent: CreateEventRequest): Promise<string>;

	getEvents(limit:number, page:number) : Promise<Event[] | null>;

	getEventByIdentifier(eventId: string) : Promise<Event | null>;

	updateEventById(eventId: string, eventFields: PatchEvent ): Promise<boolean>;

	removeEventById(eventId: string) :  Promise<boolean>;
}


