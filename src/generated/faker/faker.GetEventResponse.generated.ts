/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetEventResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetEventResponse, schemaForGetEventResponse } from "../models/GetEventResponse.generated";

	import { schemaForEvent } from '../models/Event.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';

	export function fakeGetEventResponse(useExamples: boolean, specifiedPropertiesForGetEventResponse: object = {}): GetEventResponse {
		const schema = schemaForGetEventResponse as Schema;
		const refs : Schema[] = [
			schemaForEvent as Schema,
			schemaForMetadata as Schema,
			schemaForSchedule as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetEventResponse: GetEventResponse = JSONSchemaFaker.generate(schema, refs) as GetEventResponse;
		// @ts-ignore
		const returnGetEventResponse = { ...fakeGetEventResponse, ...specifiedPropertiesForGetEventResponse };
		return returnGetEventResponse;
	}

	export function fakeGetEventResponses(useExamples: boolean, ...createGetEventResponse: object[]) : GetEventResponse[] {
		const returnGetEventResponses : GetEventResponse[] = [];
		createGetEventResponse.forEach(element => {
			returnGetEventResponses.push(fakeGetEventResponse(useExamples, element));
		});
		return returnGetEventResponses;
	}
	