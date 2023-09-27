/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetEventsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetEventsResponse, schemaForGetEventsResponse } from "../models/GetEventsResponse.generated";

	import { schemaForPagination } from '../models/Pagination.generated';
	import { schemaForEvent } from '../models/Event.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';

	export function fakeGetEventsResponse(useExamples: boolean, specifiedPropertiesForGetEventsResponse: object = {}): GetEventsResponse {
		const schema = schemaForGetEventsResponse as Schema;
		const refs : Schema[] = [
			schemaForPagination as Schema,
			schemaForEvent as Schema,
			schemaForMetadata as Schema,
			schemaForSchedule as Schema,
			schemaForTranslatableField as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetEventsResponse: GetEventsResponse = JSONSchemaFaker.generate(schema, refs) as GetEventsResponse;
		// @ts-ignore
		const returnGetEventsResponse = { ...fakeGetEventsResponse, ...specifiedPropertiesForGetEventsResponse };
		return returnGetEventsResponse;
	}

	export function fakeGetEventsResponses(useExamples: boolean, ...createGetEventsResponse: object[]) : GetEventsResponse[] {
		const returnGetEventsResponses : GetEventsResponse[] = [];
		createGetEventsResponse.forEach(element => {
			returnGetEventsResponses.push(fakeGetEventsResponse(useExamples, element));
		});
		return returnGetEventsResponses;
	}
	