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


@Service()
export class MongoDBOrganizationsRepository implements OrganizationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async getOrganizations(page:number, pageSize:number): Promise<Organization[]> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}
		const organizations = await this.dbConnector.organizations();

		return organizations
			.find({}, { projection: { _id: 0 } })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
	}

	async getOrganizationsAsReferences(page:number, pageSize:number): Promise<Reference[] | null> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}
		const organizations = await this.dbConnector.organizations();
		let or = organizations
			.find({}, { projection: getOrganizationReferenceProjection() })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
		return or as Promise<Reference[]>;
	}

	async searchOrganizations(filter: Filter, page:number, pageSize:number): Promise<Organization[]> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}
		const organizationsCollection = await this.dbConnector.organizations();
		return Promise.resolve(organizationsCollection
			.find(filter, { projection: { _id: 0 } })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray());
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
			return Promise.resolve(null);
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
		return Promise.resolve(result.modifiedCount === 1);
	}

	
	async updateOrganizationActivationStatusById(identifier: string, activationStatus: Organization['activationStatus']): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne({ identifier: identifier }, { $set: { activationStatus: activationStatus } });
		return Promise.resolve(result.modifiedCount === 1);
	}

	async updateOrganizationStatusById(identifier: string, status: Organization['status']): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();
		const result = await organizations.updateOne({ identifier: identifier }, { $set: { status: status } });
		return Promise.resolve(result.modifiedCount === 1);
	}


	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();

		const result = await organizations.deleteOne({ identifier: organizationId });
		return Promise.resolve(result.deletedCount === 1);
	}

	async countOrganizations(filter?: Filter): Promise<number> {
		const organizations = await this.dbConnector.organizations();
		if(filter) {
			return organizations.countDocuments(filter);
		}
		return organizations.countDocuments();
	}



}