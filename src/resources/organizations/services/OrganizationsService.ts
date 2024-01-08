import Container, { Inject, Service } from "typedi";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Organization } from "../../../generated/models/Organization.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { OrganizationsRepository } from "../repositories/OrganizationsRepository";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { OrganizationParams } from "../../../common/parameters/Params";
import { Error } from "../../../generated/models/Error.generated";
import { Pagination } from "../../../generated/models/Pagination.generated";
import {
	OrganizationsServiceGetStrategyParameter,
	OrganizationsServiceGetStrategyToken,
} from "./strategies/OrganizationsServiceGetStrategy";

@Service()
export class OrganizationsService {
	constructor(@Inject("OrganizationsRepository") public organizationsRepository: OrganizationsRepository) {}

	async getOrganizations(
		pagination: Pagination,
		params?: OrganizationParams,
		authUser?: AuthUser,
	): Promise<{
		customizedPagination?: Pagination;
		data?: { organizations?: Organization[]; organizationsReferences?: Reference[] };
		error?: Error;
	}> {
		let strategyParameter: OrganizationsServiceGetStrategyParameter = {
			pagination,
			params,
			authUser,
		};

		for (const s of Container.getMany(OrganizationsServiceGetStrategyToken)) {
			if (s.isExecutable(strategyParameter)) strategyParameter = s.execute(strategyParameter);
		}

		const data: Organization[] = await this.organizationsRepository.getOrganizations<Organization>(
			strategyParameter.pagination,
			strategyParameter.filter,
			strategyParameter.projection,
		);

		if (strategyParameter.params?.asReference) {
			return Promise.resolve({
				customizedPagination: strategyParameter.pagination,
				data: { organizationsReferences: data as unknown as Reference[] },
			});
		}
		return Promise.resolve({
			customizedPagination: strategyParameter.pagination,
			data: { organizations: data as unknown as Organization[] },
		});
	}

	async list(pagination?: Pagination, searchFilter?: Filter): Promise<Organization[]> {
		return this.organizationsRepository.getOrganizations(pagination, searchFilter);
	}

	async listAsReferences(pagination?: Pagination, searchFilter?: Filter): Promise<Reference[]> {
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
