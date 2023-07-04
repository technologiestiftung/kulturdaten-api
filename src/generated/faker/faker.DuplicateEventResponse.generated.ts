/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/DuplicateEventResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { DuplicateEventResponse, schemaForDuplicateEventResponse } from "../models/DuplicateEventResponse.generated";


	export function fakeDuplicateEventResponse(useExamples: boolean, specifiedPropertiesForDuplicateEventResponse: object = {}): DuplicateEventResponse {
		const schema = schemaForDuplicateEventResponse as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeDuplicateEventResponse: DuplicateEventResponse = JSONSchemaFaker.generate(schema, refs) as DuplicateEventResponse;
		// @ts-ignore
		const returnDuplicateEventResponse = { ...fakeDuplicateEventResponse, ...specifiedPropertiesForDuplicateEventResponse };
		return returnDuplicateEventResponse;
	}

	export function fakeDuplicateEventResponses(useExamples: boolean, ...createDuplicateEventResponse: object[]) : DuplicateEventResponse[] {
		const returnDuplicateEventResponses : DuplicateEventResponse[] = [];
		createDuplicateEventResponse.forEach(element => {
			returnDuplicateEventResponses.push(fakeDuplicateEventResponse(useExamples, element));
		});
		return returnDuplicateEventResponses;
	}
	