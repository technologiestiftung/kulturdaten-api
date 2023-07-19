/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateEventResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateEventResponse, schemaForCreateEventResponse } from "../models/CreateEventResponse.generated";

	import { schemaForReference } from '../models/Reference.generated';

	export function fakeCreateEventResponse(useExamples: boolean, specifiedPropertiesForCreateEventResponse: object = {}): CreateEventResponse {
		const schema = schemaForCreateEventResponse as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateEventResponse: CreateEventResponse = JSONSchemaFaker.generate(schema, refs) as CreateEventResponse;
		// @ts-ignore
		const returnCreateEventResponse = { ...fakeCreateEventResponse, ...specifiedPropertiesForCreateEventResponse };
		return returnCreateEventResponse;
	}

	export function fakeCreateEventResponses(useExamples: boolean, ...createCreateEventResponse: object[]) : CreateEventResponse[] {
		const returnCreateEventResponses : CreateEventResponse[] = [];
		createCreateEventResponse.forEach(element => {
			returnCreateEventResponses.push(fakeCreateEventResponse(useExamples, element));
		});
		return returnCreateEventResponses;
	}
	