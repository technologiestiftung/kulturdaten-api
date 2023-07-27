/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetOrganizationsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetOrganizationsResponse, schemaForGetOrganizationsResponse } from "../models/GetOrganizationsResponse.generated";

	import { schemaForOrganization } from '../models/Organization.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForReference } from '../models/Reference.generated';

	export function fakeGetOrganizationsResponse(useExamples: boolean, specifiedPropertiesForGetOrganizationsResponse: object = {}): GetOrganizationsResponse {
		const schema = schemaForGetOrganizationsResponse as Schema;
		const refs : Schema[] = [
			schemaForOrganization as Schema,
			schemaForMetadata as Schema,
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForContact as Schema,
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetOrganizationsResponse: GetOrganizationsResponse = JSONSchemaFaker.generate(schema, refs) as GetOrganizationsResponse;
		// @ts-ignore
		const returnGetOrganizationsResponse = { ...fakeGetOrganizationsResponse, ...specifiedPropertiesForGetOrganizationsResponse };
		return returnGetOrganizationsResponse;
	}

	export function fakeGetOrganizationsResponses(useExamples: boolean, ...createGetOrganizationsResponse: object[]) : GetOrganizationsResponse[] {
		const returnGetOrganizationsResponses : GetOrganizationsResponse[] = [];
		createGetOrganizationsResponse.forEach(element => {
			returnGetOrganizationsResponses.push(fakeGetOrganizationsResponse(useExamples, element));
		});
		return returnGetOrganizationsResponses;
	}
	