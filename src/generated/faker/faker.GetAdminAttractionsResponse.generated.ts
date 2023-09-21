/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetAdminAttractionsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetAdminAttractionsResponse, schemaForGetAdminAttractionsResponse } from "../models/GetAdminAttractionsResponse.generated";

	import { schemaForAdminAttraction } from '../models/AdminAttraction.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForEvent } from '../models/Event.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeGetAdminAttractionsResponse(useExamples: boolean, specifiedPropertiesForGetAdminAttractionsResponse: object = {}): GetAdminAttractionsResponse {
		const schema = schemaForGetAdminAttractionsResponse as Schema;
		const refs : Schema[] = [
			schemaForAdminAttraction as Schema,
			schemaForMetadata as Schema,
			schemaForEvent as Schema,
			schemaForSchedule as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetAdminAttractionsResponse: GetAdminAttractionsResponse = JSONSchemaFaker.generate(schema, refs) as GetAdminAttractionsResponse;
		// @ts-ignore
		const returnGetAdminAttractionsResponse = { ...fakeGetAdminAttractionsResponse, ...specifiedPropertiesForGetAdminAttractionsResponse };
		return returnGetAdminAttractionsResponse;
	}

	export function fakeGetAdminAttractionsResponses(useExamples: boolean, ...createGetAdminAttractionsResponse: object[]) : GetAdminAttractionsResponse[] {
		const returnGetAdminAttractionsResponses : GetAdminAttractionsResponse[] = [];
		createGetAdminAttractionsResponse.forEach(element => {
			returnGetAdminAttractionsResponses.push(fakeGetAdminAttractionsResponse(useExamples, element));
		});
		return returnGetAdminAttractionsResponses;
	}
	