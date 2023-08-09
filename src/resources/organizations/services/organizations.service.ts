import { OrganizationsRepository } from '../repositories/organizations.repository';
import { Inject, Service } from 'typedi';
import { Organization } from '../../../generated/models/Organization.generated';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../../generated/models/SearchOrganizationsRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { pagination } from "../../../config/kulturdaten.config";
import { Filter } from '../../../generated/models/Filter.generated';

@Service()
export class OrganizationsService  {

	constructor(@Inject('OrganizationsRepository') public organizationsRepository: OrganizationsRepository) { }

	async list(page: number = 1, pageSize: number = pagination.maxPageSize): Promise<Organization[]> {
		return  this.organizationsRepository.getOrganizations(page, pageSize);
	}

	listAsReferences(page: number = 1, pageSize: number = pagination.maxPageSize) {
		return  this.organizationsRepository.getOrganizationsAsReferences(page, pageSize);
	}

	async search(searchOrganizationsRequest: SearchOrganizationsRequest, page: number = 1, pageSize: number = pagination.maxPageSize): Promise<Organization[]> {
		return this.organizationsRepository.searchOrganizations(searchOrganizationsRequest.searchFilter? searchOrganizationsRequest.searchFilter : {}, page, pageSize);
	}

	async create(resource: CreateOrganizationRequest): Promise<Reference | null> {
		return await this.organizationsRepository.addOrganization(resource);
	}




	async readById(id: string): Promise<Organization | null> {
		return this.organizationsRepository.getOrganizationByIdentifier(id);
	}

	async readReferenceById(identifier: string) : Promise<Reference | null> {
		return this.organizationsRepository.getOrganizationReferenceByIdentifier(identifier);
	}
	

	async update(identifier: string, updateOrganizationRequest: UpdateOrganizationRequest): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationById(identifier, updateOrganizationRequest);
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

	async countOrganizations(searchFilter?: Filter): Promise<number> {
		return this.organizationsRepository.countOrganizations(searchFilter);
	  }

}
