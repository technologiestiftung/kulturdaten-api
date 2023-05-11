/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Organization
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Organization, schemaForOrganization } from "../models/Organization.generated";

	import { schemaForCore } from '../models/Core.generated';
	import { schemaForOrigin } from '../models/Origin.generated';
	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeOrganization(useExamples: boolean, specifiedPropertiesForOrganization: object = {}): Organization {
		const schema = schemaForOrganization as Schema;
		const refs : Schema[] = [
			schemaForCore as Schema,
			schemaForOrigin as Schema,
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
		const fakeOrganization: Organization = JSONSchemaFaker.generate(schema, refs) as Organization;
		// @ts-ignore
		const returnOrganization = { ...fakeOrganization, ...specifiedPropertiesForOrganization };
		return returnOrganization;
	}

	export function fakeOrganizations(useExamples: boolean, ...createOrganization: object[]) : Organization[] {
		const returnOrganizations : Organization[] = [];
		createOrganization.forEach(element => {
			returnOrganizations.push(fakeOrganization(useExamples, element));
		});
		return returnOrganizations;
	}
	