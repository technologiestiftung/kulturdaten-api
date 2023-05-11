import { OrganizationsRepository } from '../repositories/organizations.repository';
import { CRUD } from '../../common/interfaces/crud.interface';
import { Inject, Service } from 'typedi';
import { CreateOrganization } from '../../generated/models/CreateOrganization.generated';
import { PatchOrganization } from '../../generated/models/PatchOrganization.generated';
import { Organization } from '../../generated/models/Organization.generated';

@Service()
export class OrganizationsService implements CRUD {


	async searchDuplicates(organization: Organization) : Promise<Organization []> {
		return this.organizationsRepository.searchDuplicates(organization);
	}

	constructor(@Inject('OrganizationsRepository') public organizationsRepository: OrganizationsRepository){}

	async create(resource: CreateOrganization) {
		return this.organizationsRepository.addOrganization(resource);
	}

	async deleteById(id: string) {
		return this.organizationsRepository.removeOrganizationById(id);
	}

	async list(limit: number, page: number) {
		return this.organizationsRepository.getOrganizations(limit,page);
	}

	async readById(id: string) {
		return this.organizationsRepository.getOrganizationByIdentifier(id);
	}

	async patchById(id: string, resource: PatchOrganization) {
		return this.organizationsRepository.updateOrganizationById(id, resource);
	}


}
