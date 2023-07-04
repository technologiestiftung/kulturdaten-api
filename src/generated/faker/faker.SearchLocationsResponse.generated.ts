/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchLocationsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchLocationsResponse, schemaForSearchLocationsResponse } from "../models/SearchLocationsResponse.generated";

	import { schemaForGetLocationsResponse } from '../models/GetLocationsResponse.generated';
	import { schemaForLocation } from '../models/Location.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForOpeningHours } from '../models/OpeningHours.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeSearchLocationsResponse(useExamples: boolean, specifiedPropertiesForSearchLocationsResponse: object = {}): SearchLocationsResponse {
		const schema = schemaForSearchLocationsResponse as Schema;
		const refs : Schema[] = [
			schemaForGetLocationsResponse as Schema,
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
		const fakeSearchLocationsResponse: SearchLocationsResponse = JSONSchemaFaker.generate(schema, refs) as SearchLocationsResponse;
		// @ts-ignore
		const returnSearchLocationsResponse = { ...fakeSearchLocationsResponse, ...specifiedPropertiesForSearchLocationsResponse };
		return returnSearchLocationsResponse;
	}

	export function fakeSearchLocationsResponses(useExamples: boolean, ...createSearchLocationsResponse: object[]) : SearchLocationsResponse[] {
		const returnSearchLocationsResponses : SearchLocationsResponse[] = [];
		createSearchLocationsResponse.forEach(element => {
			returnSearchLocationsResponses.push(fakeSearchLocationsResponse(useExamples, element));
		});
		return returnSearchLocationsResponses;
	}
	