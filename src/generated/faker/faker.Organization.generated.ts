
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Organization, schemaForOrganization } from "../models/Organization.generated";

	import { schemaForCore } from '../models/Core.generated';
	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeOrganization(specifiedPropertiesForOrganization: object = {}): Organization {
		const schema = schemaForOrganization as Schema;
		const refs : Schema[] = [
			schemaForCore as Schema,
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForPostalAddress as Schema,
			schemaForContactPoint as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,
			schemaForShortText as Schema,

		];
		// @ts-ignore
		const fakeOrganization: Organization = JSONSchemaFaker.generate(schema, refs) as Organization;
		// @ts-ignore
		const returnOrganization = { ...fakeOrganization, ...specifiedPropertiesForOrganization };
		return returnOrganization;
	}

	export function fakeOrganizations(...createOrganization: object[]) : Organization[] {
		const returnOrganizations : Organization[] = [];
		createOrganization.forEach(element => {
			returnOrganizations.push(fakeOrganization(element));
		});
		return returnOrganizations;
	}
	