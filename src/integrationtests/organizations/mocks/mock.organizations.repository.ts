
import { CreateOrganization } from "../../../generated/models/CreateOrganization.generated";
import { Organization, schemaForOrganization } from "../../../generated/models/Organization.generated";
import { PatchOrganization } from "../../../generated/models/PatchOrganization.generated";
import { OrganizationsRepository } from "../../../organizations/repositories/organizations.repository";
import {Core, schemaForCore} from "../../../generated/models/Core.generated";
import {Title, schemaForTitle} from "../../../generated/models/Title.generated";
import {ShortText, schemaForShortText } from "../../../generated/models/ShortText.generated";
import {Text, schemaForText} from "../../../generated/models/Text.generated";
import {PostalAddress, schemaForPostalAddress} from "../../../generated/models/PostalAddress.generated";
import {ContactPoint, schemaForContactPoint} from "../../../generated/models/ContactPoint.generated";
import {DefinedTerm, schemaForDefinedTerm} from "../../../generated/models/DefinedTerm.generated";
import { faker } from '@faker-js/faker';
import { JSONSchemaFaker, Schema } from 'json-schema-faker';
import { schemaForReference } from "../../../generated/models/Reference.generated";


export class MockOrganizationsRepository implements OrganizationsRepository {


	constructor(public dummyOrganizations: Organization[] = []) { };

	reset() {
		this.dummyOrganizations = [];
	}

	public fillWithDummyOrganizations(number: number) {
		this.dummyOrganizations = dummyOrganizations(number);
	}

	public addDummyOrganization() {
		const d = dummyOrganization();
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


export function dummyOrganization(): Organization {
	const schema = schemaForOrganization as Schema;
	const refs = [
		schemaForCore as Schema,
		schemaForTitle as Schema,
		schemaForText as Schema,
		schemaForPostalAddress as Schema,
		schemaForContactPoint as Schema,
		schemaForDefinedTerm as Schema,
		schemaForShortText as Schema,
		schemaForReference as Schema
	];
	// @ts-ignore
	const fakeOrganization : Organization = JSONSchemaFaker.generate(schema, refs) as Organization;
	fakeOrganization.identifier = faker.database.mongodbObjectId();
	return fakeOrganization;
}

export function dummyCreateDto(): CreateOrganization {
	return {
		name : {
			"de": faker.company.name()
		},
		description: {
			de: faker.company.catchPhrase()
		}
	}
}

export function dummyOrganizations(number: number): Organization[] {
	let organizations: Organization[] = [];
	for (let index = 0; index < number; index++) {
		organizations.push(dummyOrganization());
	}
	return organizations;
}

