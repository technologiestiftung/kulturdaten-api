/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/AddExternalLinkRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { AddExternalLinkRequest, schemaForAddExternalLinkRequest } from "../models/AddExternalLinkRequest.generated";


	export function fakeAddExternalLinkRequest(useExamples: boolean, specifiedPropertiesForAddExternalLinkRequest: object = {}): AddExternalLinkRequest {
		const schema = schemaForAddExternalLinkRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAddExternalLinkRequest: AddExternalLinkRequest = JSONSchemaFaker.generate(schema, refs) as AddExternalLinkRequest;
		// @ts-ignore
		const returnAddExternalLinkRequest = { ...fakeAddExternalLinkRequest, ...specifiedPropertiesForAddExternalLinkRequest };
		return returnAddExternalLinkRequest;
	}

	export function fakeAddExternalLinkRequests(useExamples: boolean, ...createAddExternalLinkRequest: object[]) : AddExternalLinkRequest[] {
		const returnAddExternalLinkRequests : AddExternalLinkRequest[] = [];
		createAddExternalLinkRequest.forEach(element => {
			returnAddExternalLinkRequests.push(fakeAddExternalLinkRequest(useExamples, element));
		});
		return returnAddExternalLinkRequests;
	}
	