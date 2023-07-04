import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { OrganizationsRepository } from "./organizations.repository";
import { generateID } from "../../../utils/IDUtil";
import { Organization } from "../../../generated/models/Organization.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { SearchOrganizationsRequest } from "../../../generated/models/SearchOrganizationsRequest.generated";


@Service()
export class MongoDBOrganizationsRepository implements OrganizationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	
	async searchDuplicates(organization: Organization): Promise<Organization[]> {
		const organizations = await this.dbConnector.organizations();
		const query = { 
			'origin.originId': organization.metadata?.originObjectID,
			'origin.name': organization.metadata?.origin 
		};
		const response = await organizations.find(query).toArray();
		return response;
	}

	async addOrganization(createOrganization: CreateOrganizationRequest): Promise<string> {
		const newOrganization = createOrganization as Organization;
		newOrganization.identifier = generateID();

		const organizations = await this.dbConnector.organizations();
		await organizations.insertOne(newOrganization);
		
		return newOrganization.identifier;
	}

	async getOrganizations(limit: number, page: number): Promise<Organization[]> {
		const organizations = await this.dbConnector.organizations();
		
		return organizations.find({}, { projection: { _id: 0 } }).toArray();
	}
	async getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		const organizations = await this.dbConnector.organizations();
		
		return organizations.findOne({ identifier: organizationId }, { projection: { _id: 0 } });
	}
	async updateOrganizationById(organizationId: string, organizationFields: UpdateOrganizationRequest): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();

		const result = await organizations.updateOne({ identifier: organizationId }, { $set: organizationFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();

		const result = await organizations.deleteOne({ identifier: organizationId });
		return Promise.resolve(result.deletedCount === 1);
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
	
	searchOrganizations(searchOrganizationsRequest: SearchOrganizationsRequest): Organization[] | PromiseLike<Organization[]> {
		throw new Error("Method not implemented.");
	}

}