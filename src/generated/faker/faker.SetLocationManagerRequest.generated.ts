/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SetLocationManagerRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SetLocationManagerRequest, schemaForSetLocationManagerRequest } from "../models/SetLocationManagerRequest.generated";


	export function fakeSetLocationManagerRequest(useExamples: boolean, specifiedPropertiesForSetLocationManagerRequest: object = {}): SetLocationManagerRequest {
		const schema = schemaForSetLocationManagerRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSetLocationManagerRequest: SetLocationManagerRequest = JSONSchemaFaker.generate(schema, refs) as SetLocationManagerRequest;
		// @ts-ignore
		const returnSetLocationManagerRequest = { ...fakeSetLocationManagerRequest, ...specifiedPropertiesForSetLocationManagerRequest };
		return returnSetLocationManagerRequest;
	}

	export function fakeSetLocationManagerRequests(useExamples: boolean, ...createSetLocationManagerRequest: object[]) : SetLocationManagerRequest[] {
		const returnSetLocationManagerRequests : SetLocationManagerRequest[] = [];
		createSetLocationManagerRequest.forEach(element => {
			returnSetLocationManagerRequests.push(fakeSetLocationManagerRequest(useExamples, element));
		});
		return returnSetLocationManagerRequests;
	}
	