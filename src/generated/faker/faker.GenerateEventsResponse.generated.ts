/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GenerateEventsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GenerateEventsResponse, schemaForGenerateEventsResponse } from "../models/GenerateEventsResponse.generated";


	export function fakeGenerateEventsResponse(useExamples: boolean, specifiedPropertiesForGenerateEventsResponse: object = {}): GenerateEventsResponse {
		const schema = schemaForGenerateEventsResponse as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGenerateEventsResponse: GenerateEventsResponse = JSONSchemaFaker.generate(schema, refs) as GenerateEventsResponse;
		// @ts-ignore
		const returnGenerateEventsResponse = { ...fakeGenerateEventsResponse, ...specifiedPropertiesForGenerateEventsResponse };
		return returnGenerateEventsResponse;
	}

	export function fakeGenerateEventsResponses(useExamples: boolean, ...createGenerateEventsResponse: object[]) : GenerateEventsResponse[] {
		const returnGenerateEventsResponses : GenerateEventsResponse[] = [];
		createGenerateEventsResponse.forEach(element => {
			returnGenerateEventsResponses.push(fakeGenerateEventsResponse(useExamples, element));
		});
		return returnGenerateEventsResponses;
	}
	