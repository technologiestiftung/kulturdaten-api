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

	import { schemaForGetTagsResponse } from '../models/GetTagsResponse.generated';
	import { schemaForTag } from '../models/Tag.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeSearchLocationsResponse(useExamples: boolean, specifiedPropertiesForSearchLocationsResponse: object = {}): SearchLocationsResponse {
		const schema = schemaForSearchLocationsResponse as Schema;
		const refs : Schema[] = [
			schemaForGetTagsResponse as Schema,
			schemaForTag as Schema,
			schemaForMetadata as Schema,

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
	