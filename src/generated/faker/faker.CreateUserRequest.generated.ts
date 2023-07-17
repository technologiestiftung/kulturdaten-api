/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateUserRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateUserRequest, schemaForCreateUserRequest } from "../models/CreateUserRequest.generated";


	export function fakeCreateUserRequest(useExamples: boolean, specifiedPropertiesForCreateUserRequest: object = {}): CreateUserRequest {
		const schema = schemaForCreateUserRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateUserRequest: CreateUserRequest = JSONSchemaFaker.generate(schema, refs) as CreateUserRequest;
		// @ts-ignore
		const returnCreateUserRequest = { ...fakeCreateUserRequest, ...specifiedPropertiesForCreateUserRequest };
		return returnCreateUserRequest;
	}

	export function fakeCreateUserRequests(useExamples: boolean, ...createCreateUserRequest: object[]) : CreateUserRequest[] {
		const returnCreateUserRequests : CreateUserRequest[] = [];
		createCreateUserRequest.forEach(element => {
			returnCreateUserRequests.push(fakeCreateUserRequest(useExamples, element));
		});
		return returnCreateUserRequests;
	}
	