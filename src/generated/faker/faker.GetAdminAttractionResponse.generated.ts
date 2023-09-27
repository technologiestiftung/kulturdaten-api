/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetAdminAttractionResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetAdminAttractionResponse, schemaForGetAdminAttractionResponse } from "../models/GetAdminAttractionResponse.generated";

	import { schemaForAdminAttraction } from '../models/AdminAttraction.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForEvent } from '../models/Event.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeGetAdminAttractionResponse(useExamples: boolean, specifiedPropertiesForGetAdminAttractionResponse: object = {}): GetAdminAttractionResponse {
		const schema = schemaForGetAdminAttractionResponse as Schema;
		const refs : Schema[] = [
			schemaForAdminAttraction as Schema,
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
		const fakeGetAdminAttractionResponse: GetAdminAttractionResponse = JSONSchemaFaker.generate(schema, refs) as GetAdminAttractionResponse;
		// @ts-ignore
		const returnGetAdminAttractionResponse = { ...fakeGetAdminAttractionResponse, ...specifiedPropertiesForGetAdminAttractionResponse };
		return returnGetAdminAttractionResponse;
	}

	export function fakeGetAdminAttractionResponses(useExamples: boolean, ...createGetAdminAttractionResponse: object[]) : GetAdminAttractionResponse[] {
		const returnGetAdminAttractionResponses : GetAdminAttractionResponse[] = [];
		createGetAdminAttractionResponse.forEach(element => {
			returnGetAdminAttractionResponses.push(fakeGetAdminAttractionResponse(useExamples, element));
		});
		return returnGetAdminAttractionResponses;
	}
	