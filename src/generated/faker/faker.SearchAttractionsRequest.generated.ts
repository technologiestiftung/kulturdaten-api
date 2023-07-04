/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchAttractionsRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchAttractionsRequest, schemaForSearchAttractionsRequest } from "../models/SearchAttractionsRequest.generated";


	export function fakeSearchAttractionsRequest(useExamples: boolean, specifiedPropertiesForSearchAttractionsRequest: object = {}): SearchAttractionsRequest {
		const schema = schemaForSearchAttractionsRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchAttractionsRequest: SearchAttractionsRequest = JSONSchemaFaker.generate(schema, refs) as SearchAttractionsRequest;
		// @ts-ignore
		const returnSearchAttractionsRequest = { ...fakeSearchAttractionsRequest, ...specifiedPropertiesForSearchAttractionsRequest };
		return returnSearchAttractionsRequest;
	}

	export function fakeSearchAttractionsRequests(useExamples: boolean, ...createSearchAttractionsRequest: object[]) : SearchAttractionsRequest[] {
		const returnSearchAttractionsRequests : SearchAttractionsRequest[] = [];
		createSearchAttractionsRequest.forEach(element => {
			returnSearchAttractionsRequests.push(fakeSearchAttractionsRequest(useExamples, element));
		});
		return returnSearchAttractionsRequests;
	}
	