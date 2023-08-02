/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/UpdateOrganizationRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { UpdateOrganizationRequest, schemaForUpdateOrganizationRequest } from "../models/UpdateOrganizationRequest.generated";

	import { schemaForAddress } from '../models/Address.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForCoordinates } from '../models/Coordinates.generated';
	import { schemaForContact } from '../models/Contact.generated';

	export function fakeUpdateOrganizationRequest(useExamples: boolean, specifiedPropertiesForUpdateOrganizationRequest: object = {}): UpdateOrganizationRequest {
		const schema = schemaForUpdateOrganizationRequest as Schema;
		const refs : Schema[] = [
			schemaForAddress as Schema,
			schemaForBorough as Schema,
			schemaForCoordinates as Schema,
			schemaForContact as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeUpdateOrganizationRequest: UpdateOrganizationRequest = JSONSchemaFaker.generate(schema, refs) as UpdateOrganizationRequest;
		// @ts-ignore
		const returnUpdateOrganizationRequest = { ...fakeUpdateOrganizationRequest, ...specifiedPropertiesForUpdateOrganizationRequest };
		return returnUpdateOrganizationRequest;
	}

	export function fakeUpdateOrganizationRequests(useExamples: boolean, ...createUpdateOrganizationRequest: object[]) : UpdateOrganizationRequest[] {
		const returnUpdateOrganizationRequests : UpdateOrganizationRequest[] = [];
		createUpdateOrganizationRequest.forEach(element => {
			returnUpdateOrganizationRequests.push(fakeUpdateOrganizationRequest(useExamples, element));
		});
		return returnUpdateOrganizationRequests;
	}
	