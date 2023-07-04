/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetUserResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetUserResponse, schemaForGetUserResponse } from "../models/GetUserResponse.generated";

	import { schemaForUser } from '../models/User.generated';

	export function fakeGetUserResponse(useExamples: boolean, specifiedPropertiesForGetUserResponse: object = {}): GetUserResponse {
		const schema = schemaForGetUserResponse as Schema;
		const refs : Schema[] = [
			schemaForUser as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetUserResponse: GetUserResponse = JSONSchemaFaker.generate(schema, refs) as GetUserResponse;
		// @ts-ignore
		const returnGetUserResponse = { ...fakeGetUserResponse, ...specifiedPropertiesForGetUserResponse };
		return returnGetUserResponse;
	}

	export function fakeGetUserResponses(useExamples: boolean, ...createGetUserResponse: object[]) : GetUserResponse[] {
		const returnGetUserResponses : GetUserResponse[] = [];
		createGetUserResponse.forEach(element => {
			returnGetUserResponses.push(fakeGetUserResponse(useExamples, element));
		});
		return returnGetUserResponses;
	}
	