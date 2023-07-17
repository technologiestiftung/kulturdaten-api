/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/ClaimLocationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ClaimLocationRequest, schemaForClaimLocationRequest } from "../models/ClaimLocationRequest.generated";


	export function fakeClaimLocationRequest(useExamples: boolean, specifiedPropertiesForClaimLocationRequest: object = {}): ClaimLocationRequest {
		const schema = schemaForClaimLocationRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeClaimLocationRequest: ClaimLocationRequest = JSONSchemaFaker.generate(schema, refs) as ClaimLocationRequest;
		// @ts-ignore
		const returnClaimLocationRequest = { ...fakeClaimLocationRequest, ...specifiedPropertiesForClaimLocationRequest };
		return returnClaimLocationRequest;
	}

	export function fakeClaimLocationRequests(useExamples: boolean, ...createClaimLocationRequest: object[]) : ClaimLocationRequest[] {
		const returnClaimLocationRequests : ClaimLocationRequest[] = [];
		createClaimLocationRequest.forEach(element => {
			returnClaimLocationRequests.push(fakeClaimLocationRequest(useExamples, element));
		});
		return returnClaimLocationRequests;
	}
	