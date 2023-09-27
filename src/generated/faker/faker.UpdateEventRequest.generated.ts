/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/UpdateEventRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { UpdateEventRequest, schemaForUpdateEventRequest } from "../models/UpdateEventRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';

	export function fakeUpdateEventRequest(useExamples: boolean, specifiedPropertiesForUpdateEventRequest: object = {}): UpdateEventRequest {
		const schema = schemaForUpdateEventRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeUpdateEventRequest: UpdateEventRequest = JSONSchemaFaker.generate(schema, refs) as UpdateEventRequest;
		// @ts-ignore
		const returnUpdateEventRequest = { ...fakeUpdateEventRequest, ...specifiedPropertiesForUpdateEventRequest };
		return returnUpdateEventRequest;
	}

	export function fakeUpdateEventRequests(useExamples: boolean, ...createUpdateEventRequest: object[]) : UpdateEventRequest[] {
		const returnUpdateEventRequests : UpdateEventRequest[] = [];
		createUpdateEventRequest.forEach(element => {
			returnUpdateEventRequests.push(fakeUpdateEventRequest(useExamples, element));
		});
		return returnUpdateEventRequests;
	}
	