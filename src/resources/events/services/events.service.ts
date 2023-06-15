import { EventsRepository } from '../repositories/events.repository';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { Inject, Service } from 'typedi';
import { Event } from '../../../generated/models/Event.generated';
import { CreateEventRequest } from '../../../generated/models/CreateEventRequest.generated';
import { UpdateEventRequest } from '../../../generated/models/UpdateEventRequest.generated';

@Service()
export class EventsService implements CRUD {


	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository){}

	async searchDuplicates(event: Event) : Promise<Event[]> {
		return this.eventsRepository.searchDuplicates(event);
	}

	async create(resource: CreateEventRequest) {
		return this.eventsRepository.addEvent(resource);
	}

	async deleteById(id: string) {
		return this.eventsRepository.removeEventById(id);
	}

	async list(limit: number, page: number) {
		return this.eventsRepository.getEvents(limit,page);
	}

	async readById(id: string) {
		return this.eventsRepository.getEventByIdentifier(id);
	}

	async patchById(id: string, resource: UpdateEventRequest) {
		return this.eventsRepository.updateEventById(id, resource);
	}


}
