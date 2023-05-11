import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { OrganizationsRepository } from "./organizations.repository";
import { generateID } from "../../utils/IDUtil";
import { CreateOrganization } from "../../generated/models/CreateOrganization.generated";
import { Organization } from "../../generated/models/Organization.generated";
import { PatchOrganization } from "../../generated/models/PatchOrganization.generated";
import { Db, MongoClient } from "mongodb";


@Service()
export class MongoDBOrganizationsRepository implements OrganizationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }
	
	async searchDuplicates(organization: Organization): Promise<Organization[]> {
		const organizations = await this.dbConnector.organizations();
		const query = { 
			'origin.originId': organization.origin?.originId,
			'origin.name': organization.origin?.name 
		};
		const response = await organizations.find(query).toArray();
		return response;
	}

	async addOrganization(createOrganization: CreateOrganization): Promise<string> {
		const newOrganization = createOrganization as Organization;
		newOrganization.identifier = generateID();

		const organizations = await this.dbConnector.organizations();
		await organizations.insertOne(newOrganization);
		
		return newOrganization.identifier;
	}

	async getOrganizations(limit: number, page: number): Promise<Organization[] | null> {
		const organizations = await this.dbConnector.organizations();
		
		return organizations.find({}, { projection: { _id: 0 } }).toArray();
	}
	async getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		const organizations = await this.dbConnector.organizations();
		
		return organizations.findOne({ identifier: organizationId }, { projection: { _id: 0 } });
	}
	async updateOrganizationById(organizationId: string, organizationFields: PatchOrganization): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();

		const result = await organizations.updateOne({ identifier: organizationId }, { $set: organizationFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const organizations = await this.dbConnector.organizations();

		const result = await organizations.deleteOne({ identifier: organizationId });
		return Promise.resolve(result.deletedCount === 1);
	}

}