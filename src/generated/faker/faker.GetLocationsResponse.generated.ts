/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetLocationsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetLocationsResponse, schemaForGetLocationsResponse } from "../models/GetLocationsResponse.generated";

	import { schemaForLocation } from '../models/Location.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForOpeningHours } from '../models/OpeningHours.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeGetLocationsResponse(useExamples: boolean, specifiedPropertiesForGetLocationsResponse: object = {}): GetLocationsResponse {
		const schema = schemaForGetLocationsResponse as Schema;
		const refs : Schema[] = [
			schemaForLocation as Schema,
			schemaForMetadata as Schema,
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
		const fakeGetLocationsResponse: GetLocationsResponse = JSONSchemaFaker.generate(schema, refs) as GetLocationsResponse;
		// @ts-ignore
		const returnGetLocationsResponse = { ...fakeGetLocationsResponse, ...specifiedPropertiesForGetLocationsResponse };
		return returnGetLocationsResponse;
	}

	export function fakeGetLocationsResponses(useExamples: boolean, ...createGetLocationsResponse: object[]) : GetLocationsResponse[] {
		const returnGetLocationsResponses : GetLocationsResponse[] = [];
		createGetLocationsResponse.forEach(element => {
			returnGetLocationsResponses.push(fakeGetLocationsResponse(useExamples, element));
		});
		return returnGetLocationsResponses;
	}
	