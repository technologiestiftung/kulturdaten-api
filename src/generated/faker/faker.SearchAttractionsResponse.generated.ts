/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchAttractionsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchAttractionsResponse, schemaForSearchAttractionsResponse } from "../models/SearchAttractionsResponse.generated";

	import { schemaForGetAttractionsResponse } from '../models/GetAttractionsResponse.generated';
	import { schemaForAttraction } from '../models/Attraction.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeSearchAttractionsResponse(useExamples: boolean, specifiedPropertiesForSearchAttractionsResponse: object = {}): SearchAttractionsResponse {
		const schema = schemaForSearchAttractionsResponse as Schema;
		const refs : Schema[] = [
			schemaForGetAttractionsResponse as Schema,
			schemaForAttraction as Schema,
			schemaForMetadata as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchAttractionsResponse: SearchAttractionsResponse = JSONSchemaFaker.generate(schema, refs) as SearchAttractionsResponse;
		// @ts-ignore
		const returnSearchAttractionsResponse = { ...fakeSearchAttractionsResponse, ...specifiedPropertiesForSearchAttractionsResponse };
		return returnSearchAttractionsResponse;
	}

	export function fakeSearchAttractionsResponses(useExamples: boolean, ...createSearchAttractionsResponse: object[]) : SearchAttractionsResponse[] {
		const returnSearchAttractionsResponses : SearchAttractionsResponse[] = [];
		createSearchAttractionsResponse.forEach(element => {
			returnSearchAttractionsResponses.push(fakeSearchAttractionsResponse(useExamples, element));
		});
		return returnSearchAttractionsResponses;
	}
	