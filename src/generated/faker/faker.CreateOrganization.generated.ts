
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateOrganization, schemaForCreateOrganization } from "../models/CreateOrganization.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeCreateOrganization(useExamples: boolean, specifiedPropertiesForCreateOrganization: object = {}): CreateOrganization {
		const schema = schemaForCreateOrganization as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForPostalAddress as Schema,
			schemaForContactPoint as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,
			schemaForShortText as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateOrganization: CreateOrganization = JSONSchemaFaker.generate(schema, refs) as CreateOrganization;
		// @ts-ignore
		const returnCreateOrganization = { ...fakeCreateOrganization, ...specifiedPropertiesForCreateOrganization };
		return returnCreateOrganization;
	}

	export function fakeCreateOrganizations(useExamples: boolean, ...createCreateOrganization: object[]) : CreateOrganization[] {
		const returnCreateOrganizations : CreateOrganization[] = [];
		createCreateOrganization.forEach(element => {
			returnCreateOrganizations.push(fakeCreateOrganization(useExamples, element));
		});
		return returnCreateOrganizations;
	}
	