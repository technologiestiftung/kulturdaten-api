/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetAttractionsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetAttractionsResponse, schemaForGetAttractionsResponse } from "../models/GetAttractionsResponse.generated";

	import { schemaForPagination } from '../models/Pagination.generated';
	import { schemaForAttraction } from '../models/Attraction.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';
	import { schemaForReference } from '../models/Reference.generated';

	export function fakeGetAttractionsResponse(useExamples: boolean, specifiedPropertiesForGetAttractionsResponse: object = {}): GetAttractionsResponse {
		const schema = schemaForGetAttractionsResponse as Schema;
		const refs : Schema[] = [
			schemaForPagination as Schema,
			schemaForAttraction as Schema,
			schemaForMetadata as Schema,
			schemaForTranslatableField as Schema,
			schemaForExternalLinks as Schema,
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetAttractionsResponse: GetAttractionsResponse = JSONSchemaFaker.generate(schema, refs) as GetAttractionsResponse;
		// @ts-ignore
		const returnGetAttractionsResponse = { ...fakeGetAttractionsResponse, ...specifiedPropertiesForGetAttractionsResponse };
		return returnGetAttractionsResponse;
	}

	export function fakeGetAttractionsResponses(useExamples: boolean, ...createGetAttractionsResponse: object[]) : GetAttractionsResponse[] {
		const returnGetAttractionsResponses : GetAttractionsResponse[] = [];
		createGetAttractionsResponse.forEach(element => {
			returnGetAttractionsResponses.push(fakeGetAttractionsResponse(useExamples, element));
		});
		return returnGetAttractionsResponses;
	}
	