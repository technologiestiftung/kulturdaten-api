/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetLocationResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetLocationResponse, schemaForGetLocationResponse } from "../models/GetLocationResponse.generated";

	import { schemaForLocation } from '../models/Location.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForOpeningHours } from '../models/OpeningHours.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeGetLocationResponse(useExamples: boolean, specifiedPropertiesForGetLocationResponse: object = {}): GetLocationResponse {
		const schema = schemaForGetLocationResponse as Schema;
		const refs : Schema[] = [
			schemaForLocation as Schema,
			schemaForMetadata as Schema,
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
		const fakeGetLocationResponse: GetLocationResponse = JSONSchemaFaker.generate(schema, refs) as GetLocationResponse;
		// @ts-ignore
		const returnGetLocationResponse = { ...fakeGetLocationResponse, ...specifiedPropertiesForGetLocationResponse };
		return returnGetLocationResponse;
	}

	export function fakeGetLocationResponses(useExamples: boolean, ...createGetLocationResponse: object[]) : GetLocationResponse[] {
		const returnGetLocationResponses : GetLocationResponse[] = [];
		createGetLocationResponse.forEach(element => {
			returnGetLocationResponses.push(fakeGetLocationResponse(useExamples, element));
		});
		return returnGetLocationResponses;
	}
	