import { OrganizersRepository } from '../repositories/organizers.repository';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateOrganizer } from '../dtos/create.organizer.dto.generated';
import { Inject, Service } from 'typedi';
import { PatchOrganizer } from '../dtos/patch.organizer.dto.generated';

@Service()
export class OrganizersService implements CRUD {

	constructor(@Inject('OrganizersRepository') public organizersRepository: OrganizersRepository){}

	async create(resource: CreateOrganizer) {
		return this.organizersRepository.addOrganizer(resource);
	}

	async deleteById(id: string) {
		return this.organizersRepository.removeOrganizerById(id);
	}

	async list(limit: number, page: number) {
		return this.organizersRepository.getOrganizers(limit,page);
	}

	async readById(id: string) {
		return this.organizersRepository.getOrganizerByIdentifier(id);
	}

	async patchById(id: string, resource: PatchOrganizer) {
		return this.organizersRepository.updateOrganizerById(id, resource);
	}


}
