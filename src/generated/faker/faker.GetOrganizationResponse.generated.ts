/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetOrganizationResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetOrganizationResponse, schemaForGetOrganizationResponse } from "../models/GetOrganizationResponse.generated";

	import { schemaForOrganization } from '../models/Organization.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeGetOrganizationResponse(useExamples: boolean, specifiedPropertiesForGetOrganizationResponse: object = {}): GetOrganizationResponse {
		const schema = schemaForGetOrganizationResponse as Schema;
		const refs : Schema[] = [
			schemaForOrganization as Schema,
			schemaForMetadata as Schema,
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForContact as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetOrganizationResponse: GetOrganizationResponse = JSONSchemaFaker.generate(schema, refs) as GetOrganizationResponse;
		// @ts-ignore
		const returnGetOrganizationResponse = { ...fakeGetOrganizationResponse, ...specifiedPropertiesForGetOrganizationResponse };
		return returnGetOrganizationResponse;
	}

	export function fakeGetOrganizationResponses(useExamples: boolean, ...createGetOrganizationResponse: object[]) : GetOrganizationResponse[] {
		const returnGetOrganizationResponses : GetOrganizationResponse[] = [];
		createGetOrganizationResponse.forEach(element => {
			returnGetOrganizationResponses.push(fakeGetOrganizationResponse(useExamples, element));
		});
		return returnGetOrganizationResponses;
	}
	