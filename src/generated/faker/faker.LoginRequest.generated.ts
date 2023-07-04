/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/LoginRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { LoginRequest, schemaForLoginRequest } from "../models/LoginRequest.generated";


	export function fakeLoginRequest(useExamples: boolean, specifiedPropertiesForLoginRequest: object = {}): LoginRequest {
		const schema = schemaForLoginRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeLoginRequest: LoginRequest = JSONSchemaFaker.generate(schema, refs) as LoginRequest;
		// @ts-ignore
		const returnLoginRequest = { ...fakeLoginRequest, ...specifiedPropertiesForLoginRequest };
		return returnLoginRequest;
	}

	export function fakeLoginRequests(useExamples: boolean, ...createLoginRequest: object[]) : LoginRequest[] {
		const returnLoginRequests : LoginRequest[] = [];
		createLoginRequest.forEach(element => {
			returnLoginRequests.push(fakeLoginRequest(useExamples, element));
		});
		return returnLoginRequests;
	}
	