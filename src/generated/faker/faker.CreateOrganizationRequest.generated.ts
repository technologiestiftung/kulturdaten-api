/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateOrganizationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateOrganizationRequest, schemaForCreateOrganizationRequest } from "../models/CreateOrganizationRequest.generated";

	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeCreateOrganizationRequest(useExamples: boolean, specifiedPropertiesForCreateOrganizationRequest: object = {}): CreateOrganizationRequest {
		const schema = schemaForCreateOrganizationRequest as Schema;
		const refs : Schema[] = [
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForContact as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateOrganizationRequest: CreateOrganizationRequest = JSONSchemaFaker.generate(schema, refs) as CreateOrganizationRequest;
		// @ts-ignore
		const returnCreateOrganizationRequest = { ...fakeCreateOrganizationRequest, ...specifiedPropertiesForCreateOrganizationRequest };
		return returnCreateOrganizationRequest;
	}

	export function fakeCreateOrganizationRequests(useExamples: boolean, ...createCreateOrganizationRequest: object[]) : CreateOrganizationRequest[] {
		const returnCreateOrganizationRequests : CreateOrganizationRequest[] = [];
		createCreateOrganizationRequest.forEach(element => {
			returnCreateOrganizationRequests.push(fakeCreateOrganizationRequest(useExamples, element));
		});
		return returnCreateOrganizationRequests;
	}
	