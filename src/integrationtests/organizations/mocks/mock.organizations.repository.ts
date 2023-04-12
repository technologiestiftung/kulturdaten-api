
import { CreateOrganization } from "../../../generated/models/CreateOrganization.generated";
import { Organization } from "../../../generated/models/Organization.generated";
import { PatchOrganization } from "../../../generated/models/PatchOrganization.generated";
import { OrganizationsRepository } from "../../../organizations/repositories/organizations.repository";
import { faker } from '@faker-js/faker';



export class MockOrganizationsRepository implements OrganizationsRepository {


	constructor(public dummyOrganizations: Organization[] = []){};

	reset() {
		this.dummyOrganizations = [];
	}

	public fillWithDummyOrganizations(number: number){
		this.dummyOrganizations = dummyOrganizations(number);
	}

	public addDummyOrganization(){
		const d = dummyOrganization();
		this.dummyOrganizations.push(d);
		return d.identifier;
	}

	async addOrganization(organizationFields: CreateOrganization): Promise<string> {
		let newOrganization:Organization = {
			identifier: `IDfor${organizationFields.name}`,
			...organizationFields
		} 
		this.dummyOrganizations.push(newOrganization);
		return Promise.resolve(newOrganization.identifier);
	}
	async getOrganizations(limit: number, page: number): Promise<Organization[] | null> {
		return Promise.resolve(this.dummyOrganizations);
	}
	async getOrganizationByIdentifier(organizationId: string): Promise<Organization | null> {
		try {
			let organization: Organization | undefined = this.dummyOrganizations.find(({ identifier }) => identifier === organizationId)
			if(organization){
				return Promise.resolve(organization);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}
	
	}
	async updateOrganizationById(organizationId: string, organizationFields: PatchOrganization ): Promise<boolean> {
		if(organizationFields){
			const index = this.dummyOrganizations.findIndex(({ identifier }) => identifier === organizationId);
		
			if (index !== -1) {
				if(organizationFields.name) this.dummyOrganizations[index].name = organizationFields.name;
				if(organizationFields.description) this.dummyOrganizations[index].description = organizationFields.description;
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
		}
		return Promise.resolve(false); 
	}
	async removeOrganizationById(organizationId: string): Promise<boolean> {
		const index = this.dummyOrganizations.findIndex(({ identifier }) => identifier === organizationId);
		if(index >= 0){
			delete this.dummyOrganizations[index];
			return true;
		}
		return false;
	}

}


export function dummyOrganization(): Organization{
	return {
		identifier: faker.database.mongodbObjectId(),
		name: faker.company.name(),
		description: {
			de: faker.company.catchPhrase()
		},
		createdAt: faker.datatype.datetime().toDateString(),
		updatedAt: faker.datatype.datetime().toDateString(),
	}
}

export function dummyCreateDto(): CreateOrganization {
	return {
		name: faker.company.name(),
		description: {
			de: faker.company.catchPhrase()
		}
	}
}

export function dummyOrganizations(number: number): Organization[] {
	let organizations:Organization[] = [];
	for (let index = 0; index < number; index++) {
		organizations.push(dummyOrganization());
	}
	return organizations;
}

