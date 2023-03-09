import { OrganizersRepository } from '../repositories/organizers.repository';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateOrganizerDto } from '../dtos/create.organizer.dto';
import { PutOrganizerDto } from '../dtos/put.organizer.dto';
import { PatchOrganizerDto } from '../dtos/patch.organizer.dto';
import { Inject, Service } from 'typedi';

@Service()
export class OrganizersService implements CRUD {

	constructor(@Inject('OrganizersRepository') public organizersRepository: OrganizersRepository){}

	async create(resource: CreateOrganizerDto) {
		return this.organizersRepository.addOrganizer(resource);
	}

	async deleteById(id: string) {
		return this.organizersRepository.removeOrganizerById(id);
	}

	async list(limit: number, page: number) {
		return this.organizersRepository.getOrganizers(limit,page);
	}

	async readById(id: string) {
		return this.organizersRepository.getOrganizerById(id);
	}

	async patchById(id: string, resource: PatchOrganizerDto) {
		return this.organizersRepository.updateOrganizerById(id, resource);
	}

	async putById(id: string, resource: PutOrganizerDto) {
		return this.organizersRepository.updateOrganizerById(id, resource);
	}

}
