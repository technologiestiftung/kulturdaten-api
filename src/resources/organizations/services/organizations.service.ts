import { OrganizationsRepository } from '../repositories/organizations.repository';
import { Inject, Service } from 'typedi';
import { Organization } from '../../../generated/models/Organization.generated';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../../generated/models/SearchOrganizationsRequest.generated';

@Service()
export class OrganizationsService  {


	constructor(@Inject('OrganizationsRepository') public organizationsRepository: OrganizationsRepository) { }

	async list(limit: number, page: number): Promise<Organization[]> {
		return  this.organizationsRepository.getOrganizations(limit, page);
	}

	async create(resource: CreateOrganizationRequest): Promise<string> {
		return this.organizationsRepository.addOrganization(resource);
	}

	async readById(id: string): Promise<Organization | null> {
		return this.organizationsRepository.getOrganizationByIdentifier(id);
	}

	async update(identifier: string, updateOrganizationRequest: UpdateOrganizationRequest): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationById(identifier, updateOrganizationRequest);
	}

	async search(searchOrganizationsRequest: SearchOrganizationsRequest): Promise<Organization[]> {
		return this.organizationsRepository.searchOrganizations(searchOrganizationsRequest);
	}

	async archive(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, 'organization.archived');
	}

	async unarchive(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, 'organization.unpublished');
	}

	async publish(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, 'organization.published');
	  }

	deactivate(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationActivationStatusById(identifier, 'organization.inactive');
	}
	retire(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationActivationStatusById(identifier, 'organization.retired');
	}

	activate(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationActivationStatusById(identifier, 'organization.active');
	}

}
