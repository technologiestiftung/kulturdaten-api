/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateEventRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateEventRequest, schemaForCreateEventRequest } from "../models/CreateEventRequest.generated";

	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';

	export function fakeCreateEventRequest(useExamples: boolean, specifiedPropertiesForCreateEventRequest: object = {}): CreateEventRequest {
		const schema = schemaForCreateEventRequest as Schema;
		const refs : Schema[] = [
			schemaForSchedule as Schema,
			schemaForTranslatableField as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateEventRequest: CreateEventRequest = JSONSchemaFaker.generate(schema, refs) as CreateEventRequest;
		// @ts-ignore
		const returnCreateEventRequest = { ...fakeCreateEventRequest, ...specifiedPropertiesForCreateEventRequest };
		return returnCreateEventRequest;
	}

	export function fakeCreateEventRequests(useExamples: boolean, ...createCreateEventRequest: object[]) : CreateEventRequest[] {
		const returnCreateEventRequests : CreateEventRequest[] = [];
		createCreateEventRequest.forEach(element => {
			returnCreateEventRequests.push(fakeCreateEventRequest(useExamples, element));
		});
		return returnCreateEventRequests;
	}
	