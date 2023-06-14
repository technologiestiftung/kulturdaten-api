/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/UpdateUserPasswordRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { UpdateUserPasswordRequest, schemaForUpdateUserPasswordRequest } from "../models/UpdateUserPasswordRequest.generated";


	export function fakeUpdateUserPasswordRequest(useExamples: boolean, specifiedPropertiesForUpdateUserPasswordRequest: object = {}): UpdateUserPasswordRequest {
		const schema = schemaForUpdateUserPasswordRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeUpdateUserPasswordRequest: UpdateUserPasswordRequest = JSONSchemaFaker.generate(schema, refs) as UpdateUserPasswordRequest;
		// @ts-ignore
		const returnUpdateUserPasswordRequest = { ...fakeUpdateUserPasswordRequest, ...specifiedPropertiesForUpdateUserPasswordRequest };
		return returnUpdateUserPasswordRequest;
	}

	export function fakeUpdateUserPasswordRequests(useExamples: boolean, ...createUpdateUserPasswordRequest: object[]) : UpdateUserPasswordRequest[] {
		const returnUpdateUserPasswordRequests : UpdateUserPasswordRequest[] = [];
		createUpdateUserPasswordRequest.forEach(element => {
			returnUpdateUserPasswordRequests.push(fakeUpdateUserPasswordRequest(useExamples, element));
		});
		return returnUpdateUserPasswordRequests;
	}
	