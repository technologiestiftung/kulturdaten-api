import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { MongoDBConnector } from "../../../common/services/MongoDBConnector";
import { MONGO_DB_DEFAULT_PROJECTION } from "../../../config/Config";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Organization } from "../../../generated/models/Organization.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { generateOrganizationID } from "../../../utils/IDUtil";
import { createMetadata, getUpdatedMetadata } from "../../../utils/MetadataUtil";
import { getOrganizationReferenceProjection } from "../../../utils/ReferenceUtil";
import { OrganizationsRepository } from "./OrganizationsRepository";
import { AuthUser } from "../../../generated/models/AuthUser.generated";

@Service()
export class MongoDBOrganizationsRepository implements OrganizationsRepository {
	constructor(@Inject("DBClient") private dbConnector: MongoDBConnector) {}

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<any[]> {
		const organizations = await this.dbConnector.organizations();
		let query = organizations.find(filter || {}, {
			projection: projection ? { ...projection, ...MONGO_DB_DEFAULT_PROJECTION } : MONGO_DB_DEFAULT_PROJECTION,
		});
		if (pagination) {
			query = query.limit(pagination.pageSize).skip((pagination.page - 1) * pagination.pageSize);
		}

		return query.toArray();
	}

	async searchOrganizations(filter: Filter, pagination?: Pagination): Promise<Organization[]> {
		return this.get(filter, undefined, pagination);
	}

	async getOrganizations(pagination?: Pagination, filter?: Filter): Promise<Organization[]> {
		return this.get(filter, undefined, pagination);
	}

	async getOrganizationsAsReferences(pagination?: Pagination, filter?: Filter): Promise<Reference[]> {
		return this.get(filter, getOrganizationReferenceProjection(), pagination);
	}

	async searchAllOrganizations(filter: Filter, projection?: object): Promise<Organization[]> {
		return this.get(filter, projection, undefined);
	}

	async getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		const organizations = await this.dbConnector.organizations();
		return organizations.findOne({ identifier: organizationId }, { projection: { _id: 0 } });
	}

	async getOrganizationReferenceByIdentifier(identifier: string): Promise<Reference | null> {
		const organizations = await this.dbConnector.organizations();
		return organizations.findOne<Reference>(
			{ identifier: identifier },
			{ projection: getOrganizationReferenceProjection() },
		);
	}

	async addOrganization(createOrganization: CreateOrganizationRequest, creator?: AuthUser): Promise<Reference | null> {
		const newOrganization: Organization = {
			...createOrganization,
			type: "type.Organization",
			identifier: generateOrganizationID(),
			status: "organization.published",
			activationStatus: "organization.active",
			metadata: createMetadata(creator, createOrganization.metadata),
		};
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.insertOne(newOrganization);
		if (!result.acknowledged) {
			return null;
		}
		return {
			referenceType: "type.Organization",
			referenceId: newOrganization.identifier,
			referenceLabel: newOrganization.title,
		};
	}

	async updateOrganizationById(
		organizationId: string,
		organizationFields: UpdateOrganizationRequest,
	): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne(
			{ identifier: organizationId },
			{
				$set: {
					...organizationFields,
					...getUpdatedMetadata(),
				},
			},
		);
		return result.modifiedCount === 1;
	}

	async updateOrganizationActivationStatusById(
		identifier: string,
		activationStatus: Organization["activationStatus"],
	): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne(
			{ identifier: identifier },
			{
				$set: {
					activationStatus,
					...getUpdatedMetadata(),
				},
			},
		);
		return result.modifiedCount === 1;
	}

	async updateOrganizationStatusById(identifier: string, status: Organization["status"]): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne(
			{ identifier: identifier },
			{
				$set: {
					status,
					...getUpdatedMetadata(),
				},
			},
		);
		return result.modifiedCount === 1;
	}

	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.deleteOne({ identifier: organizationId });
		return result.deletedCount === 1;
	}

	async countOrganizations(filter?: Filter): Promise<number> {
		const organizations = await this.dbConnector.organizations();
		return organizations.countDocuments(filter);
	}
}
