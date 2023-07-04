/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetAttractionResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetAttractionResponse, schemaForGetAttractionResponse } from "../models/GetAttractionResponse.generated";

	import { schemaForAttraction } from '../models/Attraction.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeGetAttractionResponse(useExamples: boolean, specifiedPropertiesForGetAttractionResponse: object = {}): GetAttractionResponse {
		const schema = schemaForGetAttractionResponse as Schema;
		const refs : Schema[] = [
			schemaForAttraction as Schema,
			schemaForMetadata as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetAttractionResponse: GetAttractionResponse = JSONSchemaFaker.generate(schema, refs) as GetAttractionResponse;
		// @ts-ignore
		const returnGetAttractionResponse = { ...fakeGetAttractionResponse, ...specifiedPropertiesForGetAttractionResponse };
		return returnGetAttractionResponse;
	}

	export function fakeGetAttractionResponses(useExamples: boolean, ...createGetAttractionResponse: object[]) : GetAttractionResponse[] {
		const returnGetAttractionResponses : GetAttractionResponse[] = [];
		createGetAttractionResponse.forEach(element => {
			returnGetAttractionResponses.push(fakeGetAttractionResponse(useExamples, element));
		});
		return returnGetAttractionResponses;
	}
	