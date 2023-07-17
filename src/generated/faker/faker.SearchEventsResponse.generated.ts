/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchEventsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchEventsResponse, schemaForSearchEventsResponse } from "../models/SearchEventsResponse.generated";

	import { schemaForGetEventsResponse } from '../models/GetEventsResponse.generated';
	import { schemaForEvent } from '../models/Event.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';

	export function fakeSearchEventsResponse(useExamples: boolean, specifiedPropertiesForSearchEventsResponse: object = {}): SearchEventsResponse {
		const schema = schemaForSearchEventsResponse as Schema;
		const refs : Schema[] = [
			schemaForGetEventsResponse as Schema,
			schemaForEvent as Schema,
			schemaForMetadata as Schema,
			schemaForSchedule as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchEventsResponse: SearchEventsResponse = JSONSchemaFaker.generate(schema, refs) as SearchEventsResponse;
		// @ts-ignore
		const returnSearchEventsResponse = { ...fakeSearchEventsResponse, ...specifiedPropertiesForSearchEventsResponse };
		return returnSearchEventsResponse;
	}

	export function fakeSearchEventsResponses(useExamples: boolean, ...createSearchEventsResponse: object[]) : SearchEventsResponse[] {
		const returnSearchEventsResponses : SearchEventsResponse[] = [];
		createSearchEventsResponse.forEach(element => {
			returnSearchEventsResponses.push(fakeSearchEventsResponse(useExamples, element));
		});
		return returnSearchEventsResponses;
	}
	