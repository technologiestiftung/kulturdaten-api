/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Organization
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Organization, schemaForOrganization } from "../models/Organization.generated";

	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeOrganization(useExamples: boolean, specifiedPropertiesForOrganization: object = {}): Organization {
		const schema = schemaForOrganization as Schema;
		const refs : Schema[] = [
			schemaForMetadata as Schema,
			schemaForTranslatableField as Schema,
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForContact as Schema,

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
	