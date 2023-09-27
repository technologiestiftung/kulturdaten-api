/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/AddEventAttractionRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { AddEventAttractionRequest, schemaForAddEventAttractionRequest } from "../models/AddEventAttractionRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';

	export function fakeAddEventAttractionRequest(useExamples: boolean, specifiedPropertiesForAddEventAttractionRequest: object = {}): AddEventAttractionRequest {
		const schema = schemaForAddEventAttractionRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAddEventAttractionRequest: AddEventAttractionRequest = JSONSchemaFaker.generate(schema, refs) as AddEventAttractionRequest;
		// @ts-ignore
		const returnAddEventAttractionRequest = { ...fakeAddEventAttractionRequest, ...specifiedPropertiesForAddEventAttractionRequest };
		return returnAddEventAttractionRequest;
	}

	export function fakeAddEventAttractionRequests(useExamples: boolean, ...createAddEventAttractionRequest: object[]) : AddEventAttractionRequest[] {
		const returnAddEventAttractionRequests : AddEventAttractionRequest[] = [];
		createAddEventAttractionRequest.forEach(element => {
			returnAddEventAttractionRequests.push(fakeAddEventAttractionRequest(useExamples, element));
		});
		return returnAddEventAttractionRequests;
	}
	