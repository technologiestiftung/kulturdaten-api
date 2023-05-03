
import { CreateOrganization } from "../../../generated/models/CreateOrganization.generated";
import { Organization, schemaForOrganization } from "../../../generated/models/Organization.generated";
import { PatchOrganization } from "../../../generated/models/PatchOrganization.generated";
import { OrganizationsRepository } from "../../../organizations/repositories/organizations.repository";
import { fakeOrganization, fakeOrganizations } from "../../../generated/faker/faker.Organization.generated";


export class MockOrganizationsRepository implements OrganizationsRepository {


	private dummyOrganizations: Organization[];

	constructor(useExamples: boolean, ...specifiedPropertiesForOrganizations: object[]) { 
		this.dummyOrganizations = fakeOrganizations(useExamples,...specifiedPropertiesForOrganizations);
	};

	public reset() {
		this.dummyOrganizations = [];
	}

	public fillWithDummyOrganizations(useExamples: boolean, specifiedPropertiesForOrganization: object = {}) {
		this.dummyOrganizations = fakeOrganizations(useExamples,specifiedPropertiesForOrganization);
	}

	public addDummyOrganization(useExamples: boolean, specifiedPropertiesForOrganization: object = {}) {
		const d =  fakeOrganization(useExamples,specifiedPropertiesForOrganization);
		this.dummyOrganizations.push(d);
		return d.identifier;
	}

	async addOrganization(organizationFields: CreateOrganization): Promise<string> {
		let id = `IDfor${organizationFields.name}`;
		let newOrganization: Organization = {
			identifier: id,
			...organizationFields
		}
		this.dummyOrganizations.push(newOrganization);
		return Promise.resolve(id);
	}
	async getOrganizations(limit: number, page: number): Promise<Organization[] | null> {
		return Promise.resolve(this.dummyOrganizations);
	}
	async getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		try {
			let organization: Organization | undefined = this.dummyOrganizations.find(({ identifier }) => identifier === organizationId)
			if (organization) {
				return Promise.resolve(organization);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}

	}
	async updateOrganizationById(organizationId: string, organizationFields: PatchOrganization): Promise<boolean> {
		if (organizationFields) {
			const index = this.dummyOrganizations.findIndex(({ identifier }) => identifier === organizationId);

			if (index !== -1) {
				if (organizationFields.name) this.dummyOrganizations[index].name = organizationFields.name;
				if (organizationFields.description) this.dummyOrganizations[index].description = organizationFields.description;
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
		}
		return Promise.resolve(false);
	}
	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const index = this.dummyOrganizations.findIndex(({ identifier }) => identifier === organizationId);
		if (index >= 0) {
			delete this.dummyOrganizations[index];
			return true;
		}
		return false;
	}

}