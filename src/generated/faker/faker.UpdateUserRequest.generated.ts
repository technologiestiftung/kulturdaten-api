/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/UpdateUserRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { UpdateUserRequest, schemaForUpdateUserRequest } from "../models/UpdateUserRequest.generated";


	export function fakeUpdateUserRequest(useExamples: boolean, specifiedPropertiesForUpdateUserRequest: object = {}): UpdateUserRequest {
		const schema = schemaForUpdateUserRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeUpdateUserRequest: UpdateUserRequest = JSONSchemaFaker.generate(schema, refs) as UpdateUserRequest;
		// @ts-ignore
		const returnUpdateUserRequest = { ...fakeUpdateUserRequest, ...specifiedPropertiesForUpdateUserRequest };
		return returnUpdateUserRequest;
	}

	export function fakeUpdateUserRequests(useExamples: boolean, ...createUpdateUserRequest: object[]) : UpdateUserRequest[] {
		const returnUpdateUserRequests : UpdateUserRequest[] = [];
		createUpdateUserRequest.forEach(element => {
			returnUpdateUserRequests.push(fakeUpdateUserRequest(useExamples, element));
		});
		return returnUpdateUserRequests;
	}
	