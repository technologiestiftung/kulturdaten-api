/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/AddEventLocationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { AddEventLocationRequest, schemaForAddEventLocationRequest } from "../models/AddEventLocationRequest.generated";


	export function fakeAddEventLocationRequest(useExamples: boolean, specifiedPropertiesForAddEventLocationRequest: object = {}): AddEventLocationRequest {
		const schema = schemaForAddEventLocationRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAddEventLocationRequest: AddEventLocationRequest = JSONSchemaFaker.generate(schema, refs) as AddEventLocationRequest;
		// @ts-ignore
		const returnAddEventLocationRequest = { ...fakeAddEventLocationRequest, ...specifiedPropertiesForAddEventLocationRequest };
		return returnAddEventLocationRequest;
	}

	export function fakeAddEventLocationRequests(useExamples: boolean, ...createAddEventLocationRequest: object[]) : AddEventLocationRequest[] {
		const returnAddEventLocationRequests : AddEventLocationRequest[] = [];
		createAddEventLocationRequest.forEach(element => {
			returnAddEventLocationRequests.push(fakeAddEventLocationRequest(useExamples, element));
		});
		return returnAddEventLocationRequests;
	}
	