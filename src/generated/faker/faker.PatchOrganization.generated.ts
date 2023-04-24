
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { PatchOrganization, schemaForPatchOrganization } from "../models/PatchOrganization.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakePatchOrganization(useExamples: boolean, specifiedPropertiesForPatchOrganization: object = {}): PatchOrganization {
		const schema = schemaForPatchOrganization as Schema;
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
		const fakePatchOrganization: PatchOrganization = JSONSchemaFaker.generate(schema, refs) as PatchOrganization;
		// @ts-ignore
		const returnPatchOrganization = { ...fakePatchOrganization, ...specifiedPropertiesForPatchOrganization };
		return returnPatchOrganization;
	}

	export function fakePatchOrganizations(useExamples: boolean, ...createPatchOrganization: object[]) : PatchOrganization[] {
		const returnPatchOrganizations : PatchOrganization[] = [];
		createPatchOrganization.forEach(element => {
			returnPatchOrganizations.push(fakePatchOrganization(useExamples, element));
		});
		return returnPatchOrganizations;
	}
	