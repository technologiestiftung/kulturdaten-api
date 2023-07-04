/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/RemoveEventLocationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { RemoveEventLocationRequest, schemaForRemoveEventLocationRequest } from "../models/RemoveEventLocationRequest.generated";


	export function fakeRemoveEventLocationRequest(useExamples: boolean, specifiedPropertiesForRemoveEventLocationRequest: object = {}): RemoveEventLocationRequest {
		const schema = schemaForRemoveEventLocationRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeRemoveEventLocationRequest: RemoveEventLocationRequest = JSONSchemaFaker.generate(schema, refs) as RemoveEventLocationRequest;
		// @ts-ignore
		const returnRemoveEventLocationRequest = { ...fakeRemoveEventLocationRequest, ...specifiedPropertiesForRemoveEventLocationRequest };
		return returnRemoveEventLocationRequest;
	}

	export function fakeRemoveEventLocationRequests(useExamples: boolean, ...createRemoveEventLocationRequest: object[]) : RemoveEventLocationRequest[] {
		const returnRemoveEventLocationRequests : RemoveEventLocationRequest[] = [];
		createRemoveEventLocationRequest.forEach(element => {
			returnRemoveEventLocationRequests.push(fakeRemoveEventLocationRequest(useExamples, element));
		});
		return returnRemoveEventLocationRequests;
	}
	