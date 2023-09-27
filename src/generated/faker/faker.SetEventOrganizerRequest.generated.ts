/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SetEventOrganizerRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SetEventOrganizerRequest, schemaForSetEventOrganizerRequest } from "../models/SetEventOrganizerRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';

	export function fakeSetEventOrganizerRequest(useExamples: boolean, specifiedPropertiesForSetEventOrganizerRequest: object = {}): SetEventOrganizerRequest {
		const schema = schemaForSetEventOrganizerRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSetEventOrganizerRequest: SetEventOrganizerRequest = JSONSchemaFaker.generate(schema, refs) as SetEventOrganizerRequest;
		// @ts-ignore
		const returnSetEventOrganizerRequest = { ...fakeSetEventOrganizerRequest, ...specifiedPropertiesForSetEventOrganizerRequest };
		return returnSetEventOrganizerRequest;
	}

	export function fakeSetEventOrganizerRequests(useExamples: boolean, ...createSetEventOrganizerRequest: object[]) : SetEventOrganizerRequest[] {
		const returnSetEventOrganizerRequests : SetEventOrganizerRequest[] = [];
		createSetEventOrganizerRequest.forEach(element => {
			returnSetEventOrganizerRequests.push(fakeSetEventOrganizerRequest(useExamples, element));
		});
		return returnSetEventOrganizerRequests;
	}
	