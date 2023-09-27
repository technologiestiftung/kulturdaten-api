/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/AdminAttraction
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { AdminAttraction, schemaForAdminAttraction } from "../models/AdminAttraction.generated";

	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForEvent } from '../models/Event.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeAdminAttraction(useExamples: boolean, specifiedPropertiesForAdminAttraction: object = {}): AdminAttraction {
		const schema = schemaForAdminAttraction as Schema;
		const refs : Schema[] = [
			schemaForMetadata as Schema,
			schemaForTranslatableField as Schema,
			schemaForEvent as Schema,
			schemaForSchedule as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAdminAttraction: AdminAttraction = JSONSchemaFaker.generate(schema, refs) as AdminAttraction;
		// @ts-ignore
		const returnAdminAttraction = { ...fakeAdminAttraction, ...specifiedPropertiesForAdminAttraction };
		return returnAdminAttraction;
	}

	export function fakeAdminAttractions(useExamples: boolean, ...createAdminAttraction: object[]) : AdminAttraction[] {
		const returnAdminAttractions : AdminAttraction[] = [];
		createAdminAttraction.forEach(element => {
			returnAdminAttractions.push(fakeAdminAttraction(useExamples, element));
		});
		return returnAdminAttractions;
	}
	