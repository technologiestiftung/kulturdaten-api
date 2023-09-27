/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateLocationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateLocationRequest, schemaForCreateLocationRequest } from "../models/CreateLocationRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForOpeningHours } from '../models/OpeningHours.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeCreateLocationRequest(useExamples: boolean, specifiedPropertiesForCreateLocationRequest: object = {}): CreateLocationRequest {
		const schema = schemaForCreateLocationRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForOpeningHours as Schema,
			schemaForExternalLinks as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateLocationRequest: CreateLocationRequest = JSONSchemaFaker.generate(schema, refs) as CreateLocationRequest;
		// @ts-ignore
		const returnCreateLocationRequest = { ...fakeCreateLocationRequest, ...specifiedPropertiesForCreateLocationRequest };
		return returnCreateLocationRequest;
	}

	export function fakeCreateLocationRequests(useExamples: boolean, ...createCreateLocationRequest: object[]) : CreateLocationRequest[] {
		const returnCreateLocationRequests : CreateLocationRequest[] = [];
		createCreateLocationRequest.forEach(element => {
			returnCreateLocationRequests.push(fakeCreateLocationRequest(useExamples, element));
		});
		return returnCreateLocationRequests;
	}
	