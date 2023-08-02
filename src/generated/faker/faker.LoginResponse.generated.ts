/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/LoginResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { LoginResponse, schemaForLoginResponse } from "../models/LoginResponse.generated";

	import { schemaForUser } from '../models/User.generated';

	export function fakeLoginResponse(useExamples: boolean, specifiedPropertiesForLoginResponse: object = {}): LoginResponse {
		const schema = schemaForLoginResponse as Schema;
		const refs : Schema[] = [
			schemaForUser as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeLoginResponse: LoginResponse = JSONSchemaFaker.generate(schema, refs) as LoginResponse;
		// @ts-ignore
		const returnLoginResponse = { ...fakeLoginResponse, ...specifiedPropertiesForLoginResponse };
		return returnLoginResponse;
	}

	export function fakeLoginResponses(useExamples: boolean, ...createLoginResponse: object[]) : LoginResponse[] {
		const returnLoginResponses : LoginResponse[] = [];
		createLoginResponse.forEach(element => {
			returnLoginResponses.push(fakeLoginResponse(useExamples, element));
		});
		return returnLoginResponses;
	}
	