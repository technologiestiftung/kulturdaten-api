/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/UpdateAttractionRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { UpdateAttractionRequest, schemaForUpdateAttractionRequest } from "../models/UpdateAttractionRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeUpdateAttractionRequest(useExamples: boolean, specifiedPropertiesForUpdateAttractionRequest: object = {}): UpdateAttractionRequest {
		const schema = schemaForUpdateAttractionRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeUpdateAttractionRequest: UpdateAttractionRequest = JSONSchemaFaker.generate(schema, refs) as UpdateAttractionRequest;
		// @ts-ignore
		const returnUpdateAttractionRequest = { ...fakeUpdateAttractionRequest, ...specifiedPropertiesForUpdateAttractionRequest };
		return returnUpdateAttractionRequest;
	}

	export function fakeUpdateAttractionRequests(useExamples: boolean, ...createUpdateAttractionRequest: object[]) : UpdateAttractionRequest[] {
		const returnUpdateAttractionRequests : UpdateAttractionRequest[] = [];
		createUpdateAttractionRequest.forEach(element => {
			returnUpdateAttractionRequests.push(fakeUpdateAttractionRequest(useExamples, element));
		});
		return returnUpdateAttractionRequests;
	}
	