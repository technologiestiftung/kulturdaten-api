/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchTagsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchTagsResponse, schemaForSearchTagsResponse } from "../models/SearchTagsResponse.generated";

	import { schemaForGetTagsResponse } from '../models/GetTagsResponse.generated';
	import { schemaForTag } from '../models/Tag.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeSearchTagsResponse(useExamples: boolean, specifiedPropertiesForSearchTagsResponse: object = {}): SearchTagsResponse {
		const schema = schemaForSearchTagsResponse as Schema;
		const refs : Schema[] = [
			schemaForGetTagsResponse as Schema,
			schemaForTag as Schema,
			schemaForMetadata as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchTagsResponse: SearchTagsResponse = JSONSchemaFaker.generate(schema, refs) as SearchTagsResponse;
		// @ts-ignore
		const returnSearchTagsResponse = { ...fakeSearchTagsResponse, ...specifiedPropertiesForSearchTagsResponse };
		return returnSearchTagsResponse;
	}

	export function fakeSearchTagsResponses(useExamples: boolean, ...createSearchTagsResponse: object[]) : SearchTagsResponse[] {
		const returnSearchTagsResponses : SearchTagsResponse[] = [];
		createSearchTagsResponse.forEach(element => {
			returnSearchTagsResponses.push(fakeSearchTagsResponse(useExamples, element));
		});
		return returnSearchTagsResponses;
	}
	