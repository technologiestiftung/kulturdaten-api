import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { OrganizationsRepository } from "./organizations.repository";
import {  generateOrganizationID } from "../../../utils/IDUtil";
import { Organization } from "../../../generated/models/Organization.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { generateOrganizationReference, getOrganizationReferenceProjection } from "../../../utils/ReferenceUtil";
import { Pagination } from "../../../common/parameters/Pagination";
import { MONGO_DB_DEFAULT_PROJECTION } from "../../../config/kulturdaten.config";


@Service()
export class MongoDBOrganizationsRepository implements OrganizationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<any[]> {
		const organizations = await this.dbConnector.organizations();

		let query = organizations.find(filter || {}, { projection: projection ? {...projection, ...MONGO_DB_DEFAULT_PROJECTION} : MONGO_DB_DEFAULT_PROJECTION });
	
		if(pagination) {
			query = query
				.limit(pagination.pageSize)
				.skip((pagination.page - 1) * pagination.pageSize);
		}
		
		return query.toArray();
	}
	
	async searchOrganizations(filter: Filter, pagination?: Pagination): Promise<Organization[]> {
		return this.get(filter, undefined, pagination);
	}

	async getOrganizations(pagination?: Pagination): Promise<Organization[]> {
		return this.get(undefined, undefined, pagination);
	}

	async getOrganizationsAsReferences(pagination?: Pagination): Promise<Reference[]> {
		return this.get(undefined, getOrganizationReferenceProjection(), pagination);
	}


	async searchAllOrganizations(filter: Filter, projection? : object): Promise<Organization[]> {
		return this.get(filter, projection, undefined);
	}

	async getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		const organizations = await this.dbConnector.organizations();

		return organizations.findOne({ identifier: organizationId }, { projection: { _id: 0 } });
	}

	async getOrganizationReferenceByIdentifier(identifier: string): Promise<Reference | null> {
		const organizations = await this.dbConnector.organizations();
		return organizations.findOne( { identifier: identifier }, { projection: getOrganizationReferenceProjection() }) as Reference;
	}


	async addOrganization(createOrganization: CreateOrganizationRequest): Promise<Reference | null> {
		const newOrganization = createOrganization as Organization;
		newOrganization.identifier = generateOrganizationID();

		const organizations = await this.dbConnector.organizations();
		const result = await organizations.insertOne(newOrganization);

		if(!result.acknowledged){
			return null;
		}
		return {
			referenceType: 'type.Organization',
			referenceId: newOrganization.identifier,
			referenceLabel: newOrganization.displayName? newOrganization.displayName : newOrganization.title
		};
	}


	async updateOrganizationById(organizationId: string, organizationFields: UpdateOrganizationRequest): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();

		const result = await organizations.updateOne({ identifier: organizationId }, { $set: organizationFields });
		return result.modifiedCount === 1;
	}

	
	async updateOrganizationActivationStatusById(identifier: string, activationStatus: Organization['activationStatus']): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne({ identifier: identifier }, { $set: { activationStatus: activationStatus } });
		return result.modifiedCount === 1;
	}

	async updateOrganizationStatusById(identifier: string, status: Organization['status']): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne({ identifier: identifier }, { $set: { status: status } });
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