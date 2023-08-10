/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchTagsRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchTagsRequest, schemaForSearchTagsRequest } from "../models/SearchTagsRequest.generated";


	export function fakeSearchTagsRequest(useExamples: boolean, specifiedPropertiesForSearchTagsRequest: object = {}): SearchTagsRequest {
		const schema = schemaForSearchTagsRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchTagsRequest: SearchTagsRequest = JSONSchemaFaker.generate(schema, refs) as SearchTagsRequest;
		// @ts-ignore
		const returnSearchTagsRequest = { ...fakeSearchTagsRequest, ...specifiedPropertiesForSearchTagsRequest };
		return returnSearchTagsRequest;
	}

	export function fakeSearchTagsRequests(useExamples: boolean, ...createSearchTagsRequest: object[]) : SearchTagsRequest[] {
		const returnSearchTagsRequests : SearchTagsRequest[] = [];
		createSearchTagsRequest.forEach(element => {
			returnSearchTagsRequests.push(fakeSearchTagsRequest(useExamples, element));
		});
		return returnSearchTagsRequests;
	}
	