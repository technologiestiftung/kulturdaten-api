/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateOrganizationResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateOrganizationResponse, schemaForCreateOrganizationResponse } from "../models/CreateOrganizationResponse.generated";

	import { schemaForReference } from '../models/Reference.generated';

	export function fakeCreateOrganizationResponse(useExamples: boolean, specifiedPropertiesForCreateOrganizationResponse: object = {}): CreateOrganizationResponse {
		const schema = schemaForCreateOrganizationResponse as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateOrganizationResponse: CreateOrganizationResponse = JSONSchemaFaker.generate(schema, refs) as CreateOrganizationResponse;
		// @ts-ignore
		const returnCreateOrganizationResponse = { ...fakeCreateOrganizationResponse, ...specifiedPropertiesForCreateOrganizationResponse };
		return returnCreateOrganizationResponse;
	}

	export function fakeCreateOrganizationResponses(useExamples: boolean, ...createCreateOrganizationResponse: object[]) : CreateOrganizationResponse[] {
		const returnCreateOrganizationResponses : CreateOrganizationResponse[] = [];
		createCreateOrganizationResponse.forEach(element => {
			returnCreateOrganizationResponses.push(fakeCreateOrganizationResponse(useExamples, element));
		});
		return returnCreateOrganizationResponses;
	}
	