import { EventsRepository } from '../repositories/events.repository';
import { CRUD } from '../../common/interfaces/crud.interface';
import { Inject, Service } from 'typedi';
import { CreateEvent } from '../../generated/models/CreateEvent.generated';
import { PatchEvent } from '../../generated/models/PatchEvent.generated';

@Service()
export class EventsService implements CRUD {

	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository){}

	async create(resource: CreateEvent) {
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

	async patchById(id: string, resource: PatchEvent) {
		return this.eventsRepository.updateEventById(id, resource);
	}


}
