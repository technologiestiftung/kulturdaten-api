/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/UpdateLocationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { UpdateLocationRequest, schemaForUpdateLocationRequest } from "../models/UpdateLocationRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeUpdateLocationRequest(useExamples: boolean, specifiedPropertiesForUpdateLocationRequest: object = {}): UpdateLocationRequest {
		const schema = schemaForUpdateLocationRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForExternalLinks as Schema,
			schemaForContact as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeUpdateLocationRequest: UpdateLocationRequest = JSONSchemaFaker.generate(schema, refs) as UpdateLocationRequest;
		// @ts-ignore
		const returnUpdateLocationRequest = { ...fakeUpdateLocationRequest, ...specifiedPropertiesForUpdateLocationRequest };
		return returnUpdateLocationRequest;
	}

	export function fakeUpdateLocationRequests(useExamples: boolean, ...createUpdateLocationRequest: object[]) : UpdateLocationRequest[] {
		const returnUpdateLocationRequests : UpdateLocationRequest[] = [];
		createUpdateLocationRequest.forEach(element => {
			returnUpdateLocationRequests.push(fakeUpdateLocationRequest(useExamples, element));
		});
		return returnUpdateLocationRequests;
	}
	