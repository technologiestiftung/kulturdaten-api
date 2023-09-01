/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchEventsRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchEventsRequest, schemaForSearchEventsRequest } from "../models/SearchEventsRequest.generated";

	import { schemaForMatchMode } from '../models/MatchMode.generated';

	export function fakeSearchEventsRequest(useExamples: boolean, specifiedPropertiesForSearchEventsRequest: object = {}): SearchEventsRequest {
		const schema = schemaForSearchEventsRequest as Schema;
		const refs : Schema[] = [
			schemaForMatchMode as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchEventsRequest: SearchEventsRequest = JSONSchemaFaker.generate(schema, refs) as SearchEventsRequest;
		// @ts-ignore
		const returnSearchEventsRequest = { ...fakeSearchEventsRequest, ...specifiedPropertiesForSearchEventsRequest };
		return returnSearchEventsRequest;
	}

	export function fakeSearchEventsRequests(useExamples: boolean, ...createSearchEventsRequest: object[]) : SearchEventsRequest[] {
		const returnSearchEventsRequests : SearchEventsRequest[] = [];
		createSearchEventsRequest.forEach(element => {
			returnSearchEventsRequests.push(fakeSearchEventsRequest(useExamples, element));
		});
		return returnSearchEventsRequests;
	}
	