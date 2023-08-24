import { EventsRepository } from '../repositories/events.repository';
import { Inject, Service } from 'typedi';
import { Event } from '../../../generated/models/Event.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';
import { SearchEventsRequest } from '../../../generated/models/SearchEventsRequest.generated';
import { AddEventLocationRequest } from '../../../generated/models/AddEventLocationRequest.generated';
import { RemoveEventLocationRequest } from '../../../generated/models/RemoveEventLocationRequest.generated';
import { AddEventAttractionRequest } from '../../../generated/models/AddEventAttractionRequest.generated';
import { RemoveEventAttractionRequest } from '../../../generated/models/RemoveEventAttractionRequest.generated';
import { SetEventOrganizerRequest } from '../../../generated/models/SetEventOrganizerRequest.generated';
import { RescheduleEventRequest } from '../../../generated/models/RescheduleEventRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { pagination } from "../../../config/kulturdaten.config";
import { Filter } from '../../../generated/models/Filter.generated';
import { Pagination } from '../../../common/parameters/Pagination';

@Service()
export class EventsService {

	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository) { }

	async list(pagination?: Pagination) {
		return this.eventsRepository.getEvents(pagination);
	}

	async listAsReferences(pagination?: Pagination) {
		return this.eventsRepository.getEventsAsReferences(pagination);
	}

	async search(filter?: Filter, pagination?: Pagination): Promise<Event[]> {
		return this.eventsRepository.searchEvents(filter, pagination);
	}

	async countEvents(filter?: Filter): Promise<number> {
		return this.eventsRepository.countEvents(filter);
	  }


	async create(resource: CreateEventRequest) : Promise<Reference | null> {
		return this.eventsRepository.addEvent(resource);
	}

	duplicate(identifier: string): Promise<String> | null {
		throw new Error('Method not implemented.');
	}



	async readById(id: string) {
		return this.eventsRepository.getEventByIdentifier(id);
	}

	async readReferenceById(id: string) {
		return this.eventsRepository.getEventReferenceByIdentifier(id);
	}

	update(identifier: string, updateEventRequest: UpdateEventRequest): Promise<boolean> {
		return this.eventsRepository.updateEventById(identifier, updateEventRequest);
	}

	addEventLocation(identifier: string, addEventLocationRequest: AddEventLocationRequest): Promise<boolean> {
		const reference = {
			referenceType: 'type.Location',
			referenceId: addEventLocationRequest.locationIdentifier,
			referenceLabel: addEventLocationRequest.alternativeDisplayName
		}
		return this.eventsRepository.addEventLocation(identifier, reference);
	}

	removeEventLocation(identifier: string, removeEventLocationRequest: RemoveEventLocationRequest): Promise<boolean> {
		return this.eventsRepository.removeEventLocation(identifier, removeEventLocationRequest.locationIdentifier);
	}

	addEventAttraction(identifier: string, addEventAttractionRequest: AddEventAttractionRequest): Promise<boolean> {
        const reference = {
            referenceType: 'type.Attraction',
            referenceId: addEventAttractionRequest.attractionIdentifier,
            referenceLabel: addEventAttractionRequest.alternativeDisplayName
        };
        return this.eventsRepository.addEventAttraction(identifier, reference);
  	}

	removeEventAttraction(identifier: string, removeEventAttractionRequest: RemoveEventAttractionRequest): Promise<boolean> {
		return this.eventsRepository.removeEventAttraction(identifier, removeEventAttractionRequest.attractionIdentifier);
	}

	setEventOrganizer(identifier: string, setEventOrganizerRequest: SetEventOrganizerRequest): Promise<boolean> {
			const reference = {
				referenceType: 'type.Organizer',
				referenceId: setEventOrganizerRequest.organizationIdentifier,
				referenceLabel: setEventOrganizerRequest.alternativeDisplayName
			};
			return this.eventsRepository.setEventOrganizer(identifier, reference);
	}

	deleteEventOrganizer(identifier: string): Promise<boolean> {
		return this.eventsRepository.deleteEventOrganizer(identifier);
	}

	publish(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.published");
	}
	unpublish(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.unpublished");
	}

	archive(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.archived");
	}
	unarchive(identifier: string): Promise<boolean> {
		return this.eventsRepository.setEventStatus(identifier, "event.unpublished");
	}

	cancel(identifier: string): Promise<boolean> {
		return this.eventsRepository.setScheduleStatus(identifier, "event.cancelled");
	}

	postpone(identifier: string): Promise<boolean> {
		return this.eventsRepository.setScheduleStatus(identifier, "event.postponed");
	}

	reschedule(identifier: string, rescheduleEventRequest: RescheduleEventRequest): Promise<boolean> {
		return this.eventsRepository.reschedule(identifier, rescheduleEventRequest);
	}

	async searchDuplicates(event: Event): Promise<Event[]> {
		return this.eventsRepository.searchDuplicates(event);
	}



}
