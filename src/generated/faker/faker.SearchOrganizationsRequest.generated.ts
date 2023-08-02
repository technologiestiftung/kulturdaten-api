/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchOrganizationsRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchOrganizationsRequest, schemaForSearchOrganizationsRequest } from "../models/SearchOrganizationsRequest.generated";


	export function fakeSearchOrganizationsRequest(useExamples: boolean, specifiedPropertiesForSearchOrganizationsRequest: object = {}): SearchOrganizationsRequest {
		const schema = schemaForSearchOrganizationsRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSearchOrganizationsRequest: SearchOrganizationsRequest = JSONSchemaFaker.generate(schema, refs) as SearchOrganizationsRequest;
		// @ts-ignore
		const returnSearchOrganizationsRequest = { ...fakeSearchOrganizationsRequest, ...specifiedPropertiesForSearchOrganizationsRequest };
		return returnSearchOrganizationsRequest;
	}

	export function fakeSearchOrganizationsRequests(useExamples: boolean, ...createSearchOrganizationsRequest: object[]) : SearchOrganizationsRequest[] {
		const returnSearchOrganizationsRequests : SearchOrganizationsRequest[] = [];
		createSearchOrganizationsRequest.forEach(element => {
			returnSearchOrganizationsRequests.push(fakeSearchOrganizationsRequest(useExamples, element));
		});
		return returnSearchOrganizationsRequests;
	}
	