/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/HealthResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { HealthResponse, schemaForHealthResponse } from "../models/HealthResponse.generated";


	export function fakeHealthResponse(useExamples: boolean, specifiedPropertiesForHealthResponse: object = {}): HealthResponse {
		const schema = schemaForHealthResponse as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeHealthResponse: HealthResponse = JSONSchemaFaker.generate(schema, refs) as HealthResponse;
		// @ts-ignore
		const returnHealthResponse = { ...fakeHealthResponse, ...specifiedPropertiesForHealthResponse };
		return returnHealthResponse;
	}

	export function fakeHealthResponses(useExamples: boolean, ...createHealthResponse: object[]) : HealthResponse[] {
		const returnHealthResponses : HealthResponse[] = [];
		createHealthResponse.forEach(element => {
			returnHealthResponses.push(fakeHealthResponse(useExamples, element));
		});
		return returnHealthResponses;
	}
	