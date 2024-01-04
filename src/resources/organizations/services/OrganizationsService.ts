import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Organization } from "../../../generated/models/Organization.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { OrganizationsRepository } from "../repositories/OrganizationsRepository";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { OrganizationParams } from "../../../common/parameters/Params";
import { Error } from "../../../generated/models/Error.generated";

// customizedPagination, data, related, error

@Service()
export class OrganizationsService {
	getOrganizations(
		pagination: Pagination,
		params?: OrganizationParams,
	): Promise<{ customizedPagination?: Pagination; data?: Organization[]; related?: Reference[]; error?: Error }> {
		throw new Error("Method not implemented.");
	}
	constructor(@Inject("OrganizationsRepository") public organizationsRepository: OrganizationsRepository) {}

	async list(pagination?: Pagination, searchFilter?: Filter): Promise<Organization[]> {
		return this.organizationsRepository.getOrganizations(pagination, searchFilter);
	}

	async listAsReferences(pagination?: Pagination, searchFilter?: Filter) {
		return this.organizationsRepository.getOrganizationsAsReferences(pagination, searchFilter);
	}

	async search(filter?: Filter, pagination?: Pagination): Promise<Organization[]> {
		return this.organizationsRepository.searchOrganizations(filter, pagination);
	}

	async create(resource: CreateOrganizationRequest, authUser?: AuthUser): Promise<Reference | null> {
		return await this.organizationsRepository.addOrganization(resource, authUser);
	}

	async readById(id: string): Promise<Organization | null> {
		return this.organizationsRepository.getOrganizationByIdentifier(id);
	}

	async readReferenceById(identifier: string): Promise<Reference | null> {
		return this.organizationsRepository.getOrganizationReferenceByIdentifier(identifier);
	}

	async update(identifier: string, updateOrganizationRequest: UpdateOrganizationRequest): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationById(identifier, updateOrganizationRequest);
	}

	async archive(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, "organization.archived");
	}

	async unarchive(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, "organization.unpublished");
	}

	async publish(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, "organization.published");
	}

	async unpublish(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationStatusById(identifier, "organization.unpublished");
	}

	deactivate(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationActivationStatusById(identifier, "organization.inactive");
	}
	retire(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationActivationStatusById(identifier, "organization.retired");
	}

	activate(identifier: string): Promise<boolean> {
		return this.organizationsRepository.updateOrganizationActivationStatusById(identifier, "organization.active");
	}

	async countOrganizations(searchFilter?: Filter): Promise<number> {
		return this.organizationsRepository.countOrganizations(searchFilter);
	}
}
