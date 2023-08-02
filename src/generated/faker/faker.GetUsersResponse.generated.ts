/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetUsersResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetUsersResponse, schemaForGetUsersResponse } from "../models/GetUsersResponse.generated";

	import { schemaForUser } from '../models/User.generated';

	export function fakeGetUsersResponse(useExamples: boolean, specifiedPropertiesForGetUsersResponse: object = {}): GetUsersResponse {
		const schema = schemaForGetUsersResponse as Schema;
		const refs : Schema[] = [
			schemaForUser as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetUsersResponse: GetUsersResponse = JSONSchemaFaker.generate(schema, refs) as GetUsersResponse;
		// @ts-ignore
		const returnGetUsersResponse = { ...fakeGetUsersResponse, ...specifiedPropertiesForGetUsersResponse };
		return returnGetUsersResponse;
	}

	export function fakeGetUsersResponses(useExamples: boolean, ...createGetUsersResponse: object[]) : GetUsersResponse[] {
		const returnGetUsersResponses : GetUsersResponse[] = [];
		createGetUsersResponse.forEach(element => {
			returnGetUsersResponses.push(fakeGetUsersResponse(useExamples, element));
		});
		return returnGetUsersResponses;
	}
	