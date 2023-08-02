/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/SearchOrganizationsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { SearchOrganizationsResponse, schemaForSearchOrganizationsResponse } from "../models/SearchOrganizationsResponse.generated";

	import { schemaForGetOrganizationsResponse } from '../models/GetOrganizationsResponse.generated';
	import { schemaForOrganization } from '../models/Organization.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForReference } from '../models/Reference.generated';

	export function fakeSearchOrganizationsResponse(useExamples: boolean, specifiedPropertiesForSearchOrganizationsResponse: object = {}): SearchOrganizationsResponse {
		const schema = schemaForSearchOrganizationsResponse as Schema;
		const refs : Schema[] = [
			schemaForGetOrganizationsResponse as Schema,
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
		const fakeSearchOrganizationsResponse: SearchOrganizationsResponse = JSONSchemaFaker.generate(schema, refs) as SearchOrganizationsResponse;
		// @ts-ignore
		const returnSearchOrganizationsResponse = { ...fakeSearchOrganizationsResponse, ...specifiedPropertiesForSearchOrganizationsResponse };
		return returnSearchOrganizationsResponse;
	}

	export function fakeSearchOrganizationsResponses(useExamples: boolean, ...createSearchOrganizationsResponse: object[]) : SearchOrganizationsResponse[] {
		const returnSearchOrganizationsResponses : SearchOrganizationsResponse[] = [];
		createSearchOrganizationsResponse.forEach(element => {
			returnSearchOrganizationsResponses.push(fakeSearchOrganizationsResponse(useExamples, element));
		});
		return returnSearchOrganizationsResponses;
	}
	