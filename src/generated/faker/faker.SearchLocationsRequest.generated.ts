/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchLocationsRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchLocationsRequest, schemaForSearchLocationsRequest } from "../models/SearchLocationsRequest.generated";

	import { schemaForMatchMode } from '../models/MatchMode.generated';

	export function fakeSearchLocationsRequest(useExamples: boolean, specifiedPropertiesForSearchLocationsRequest: object = {}): SearchLocationsRequest {
		const schema = schemaForSearchLocationsRequest as Schema;
		const refs : Schema[] = [
			schemaForMatchMode as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchLocationsRequest: SearchLocationsRequest = JSONSchemaFaker.generate(schema, refs) as SearchLocationsRequest;
		// @ts-ignore
		const returnSearchLocationsRequest = { ...fakeSearchLocationsRequest, ...specifiedPropertiesForSearchLocationsRequest };
		return returnSearchLocationsRequest;
	}

	export function fakeSearchLocationsRequests(useExamples: boolean, ...createSearchLocationsRequest: object[]) : SearchLocationsRequest[] {
		const returnSearchLocationsRequests : SearchLocationsRequest[] = [];
		createSearchLocationsRequest.forEach(element => {
			returnSearchLocationsRequests.push(fakeSearchLocationsRequest(useExamples, element));
		});
		return returnSearchLocationsRequests;
	}
	