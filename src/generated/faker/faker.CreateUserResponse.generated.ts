/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateUserResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateUserResponse, schemaForCreateUserResponse } from "../models/CreateUserResponse.generated";


	export function fakeCreateUserResponse(useExamples: boolean, specifiedPropertiesForCreateUserResponse: object = {}): CreateUserResponse {
		const schema = schemaForCreateUserResponse as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateUserResponse: CreateUserResponse = JSONSchemaFaker.generate(schema, refs) as CreateUserResponse;
		// @ts-ignore
		const returnCreateUserResponse = { ...fakeCreateUserResponse, ...specifiedPropertiesForCreateUserResponse };
		return returnCreateUserResponse;
	}

	export function fakeCreateUserResponses(useExamples: boolean, ...createCreateUserResponse: object[]) : CreateUserResponse[] {
		const returnCreateUserResponses : CreateUserResponse[] = [];
		createCreateUserResponse.forEach(element => {
			returnCreateUserResponses.push(fakeCreateUserResponse(useExamples, element));
		});
		return returnCreateUserResponses;
	}
	