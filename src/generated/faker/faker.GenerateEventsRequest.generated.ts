/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GenerateEventsRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GenerateEventsRequest, schemaForGenerateEventsRequest } from "../models/GenerateEventsRequest.generated";


	export function fakeGenerateEventsRequest(useExamples: boolean, specifiedPropertiesForGenerateEventsRequest: object = {}): GenerateEventsRequest {
		const schema = schemaForGenerateEventsRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGenerateEventsRequest: GenerateEventsRequest = JSONSchemaFaker.generate(schema, refs) as GenerateEventsRequest;
		// @ts-ignore
		const returnGenerateEventsRequest = { ...fakeGenerateEventsRequest, ...specifiedPropertiesForGenerateEventsRequest };
		return returnGenerateEventsRequest;
	}

	export function fakeGenerateEventsRequests(useExamples: boolean, ...createGenerateEventsRequest: object[]) : GenerateEventsRequest[] {
		const returnGenerateEventsRequests : GenerateEventsRequest[] = [];
		createGenerateEventsRequest.forEach(element => {
			returnGenerateEventsRequests.push(fakeGenerateEventsRequest(useExamples, element));
		});
		return returnGenerateEventsRequests;
	}
	