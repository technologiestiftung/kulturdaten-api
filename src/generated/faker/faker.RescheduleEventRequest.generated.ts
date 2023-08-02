/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/RescheduleEventRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { RescheduleEventRequest, schemaForRescheduleEventRequest } from "../models/RescheduleEventRequest.generated";


	export function fakeRescheduleEventRequest(useExamples: boolean, specifiedPropertiesForRescheduleEventRequest: object = {}): RescheduleEventRequest {
		const schema = schemaForRescheduleEventRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeRescheduleEventRequest: RescheduleEventRequest = JSONSchemaFaker.generate(schema, refs) as RescheduleEventRequest;
		// @ts-ignore
		const returnRescheduleEventRequest = { ...fakeRescheduleEventRequest, ...specifiedPropertiesForRescheduleEventRequest };
		return returnRescheduleEventRequest;
	}

	export function fakeRescheduleEventRequests(useExamples: boolean, ...createRescheduleEventRequest: object[]) : RescheduleEventRequest[] {
		const returnRescheduleEventRequests : RescheduleEventRequest[] = [];
		createRescheduleEventRequest.forEach(element => {
			returnRescheduleEventRequests.push(fakeRescheduleEventRequest(useExamples, element));
		});
		return returnRescheduleEventRequests;
	}
	