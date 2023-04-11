import { Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { OrganizationsRepository } from "./organizations.repository";
import { generateID } from "../../utils/IDUtil";
import { CreateOrganization } from "../../generatedModels/CreateOrganization.generated";
import { Organization } from "../../generatedModels/Organization.generated";
import { PatchOrganization } from "../../generatedModels/PatchOrganization.generated";


@Service()
export class MongoDBOrganizationsRepository implements OrganizationsRepository {

	constructor(private db: MongoDBConnector) { }

	async addOrganization(createOrganization: CreateOrganization): Promise<string> {
		const newOrganization = createOrganization as Organization;
		newOrganization.identifier = generateID();
		await this.db.organizations().insertOne(createOrganization as Organization);
		return newOrganization.identifier;
	}
	getOrganizations(limit: number, page: number): Promise<Organization[] | null> {
		return this.db.organizations().find({}, { projection: { _id: 0 } }).toArray();
	}
	getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		return this.db.organizations().findOne({ identifier: organizationId }, { projection: { _id: 0 } });
	}
	async updateOrganizationById(organizationId: string, organizationFields: PatchOrganization): Promise<boolean> {
		const result = await this.db.organizations().updateOne({ identifier: organizationId }, { $set: organizationFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const result = await this.db.organizations().deleteOne({ identifier: organizationId });
		return Promise.resolve(result.deletedCount === 1);
	}

}