/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/RemoveExternalLinkRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { RemoveExternalLinkRequest, schemaForRemoveExternalLinkRequest } from "../models/RemoveExternalLinkRequest.generated";


	export function fakeRemoveExternalLinkRequest(useExamples: boolean, specifiedPropertiesForRemoveExternalLinkRequest: object = {}): RemoveExternalLinkRequest {
		const schema = schemaForRemoveExternalLinkRequest as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeRemoveExternalLinkRequest: RemoveExternalLinkRequest = JSONSchemaFaker.generate(schema, refs) as RemoveExternalLinkRequest;
		// @ts-ignore
		const returnRemoveExternalLinkRequest = { ...fakeRemoveExternalLinkRequest, ...specifiedPropertiesForRemoveExternalLinkRequest };
		return returnRemoveExternalLinkRequest;
	}

	export function fakeRemoveExternalLinkRequests(useExamples: boolean, ...createRemoveExternalLinkRequest: object[]) : RemoveExternalLinkRequest[] {
		const returnRemoveExternalLinkRequests : RemoveExternalLinkRequest[] = [];
		createRemoveExternalLinkRequest.forEach(element => {
			returnRemoveExternalLinkRequests.push(fakeRemoveExternalLinkRequest(useExamples, element));
		});
		return returnRemoveExternalLinkRequests;
	}
	