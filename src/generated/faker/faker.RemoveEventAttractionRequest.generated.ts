/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/RemoveEventAttractionRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { RemoveEventAttractionRequest, schemaForRemoveEventAttractionRequest } from "../models/RemoveEventAttractionRequest.generated";


	export function fakeRemoveEventAttractionRequest(useExamples: boolean, specifiedPropertiesForRemoveEventAttractionRequest: object = {}): RemoveEventAttractionRequest {
		const schema = schemaForRemoveEventAttractionRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeRemoveEventAttractionRequest: RemoveEventAttractionRequest = JSONSchemaFaker.generate(schema, refs) as RemoveEventAttractionRequest;
		// @ts-ignore
		const returnRemoveEventAttractionRequest = { ...fakeRemoveEventAttractionRequest, ...specifiedPropertiesForRemoveEventAttractionRequest };
		return returnRemoveEventAttractionRequest;
	}

	export function fakeRemoveEventAttractionRequests(useExamples: boolean, ...createRemoveEventAttractionRequest: object[]) : RemoveEventAttractionRequest[] {
		const returnRemoveEventAttractionRequests : RemoveEventAttractionRequest[] = [];
		createRemoveEventAttractionRequest.forEach(element => {
			returnRemoveEventAttractionRequests.push(fakeRemoveEventAttractionRequest(useExamples, element));
		});
		return returnRemoveEventAttractionRequests;
	}
	