/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateLocationResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateLocationResponse, schemaForCreateLocationResponse } from "../models/CreateLocationResponse.generated";


	export function fakeCreateLocationResponse(useExamples: boolean, specifiedPropertiesForCreateLocationResponse: object = {}): CreateLocationResponse {
		const schema = schemaForCreateLocationResponse as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateLocationResponse: CreateLocationResponse = JSONSchemaFaker.generate(schema, refs) as CreateLocationResponse;
		// @ts-ignore
		const returnCreateLocationResponse = { ...fakeCreateLocationResponse, ...specifiedPropertiesForCreateLocationResponse };
		return returnCreateLocationResponse;
	}

	export function fakeCreateLocationResponses(useExamples: boolean, ...createCreateLocationResponse: object[]) : CreateLocationResponse[] {
		const returnCreateLocationResponses : CreateLocationResponse[] = [];
		createCreateLocationResponse.forEach(element => {
			returnCreateLocationResponses.push(fakeCreateLocationResponse(useExamples, element));
		});
		return returnCreateLocationResponses;
	}
	