/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateAttractionRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateAttractionRequest, schemaForCreateAttractionRequest } from "../models/CreateAttractionRequest.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeCreateAttractionRequest(useExamples: boolean, specifiedPropertiesForCreateAttractionRequest: object = {}): CreateAttractionRequest {
		const schema = schemaForCreateAttractionRequest as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateAttractionRequest: CreateAttractionRequest = JSONSchemaFaker.generate(schema, refs) as CreateAttractionRequest;
		// @ts-ignore
		const returnCreateAttractionRequest = { ...fakeCreateAttractionRequest, ...specifiedPropertiesForCreateAttractionRequest };
		return returnCreateAttractionRequest;
	}

	export function fakeCreateAttractionRequests(useExamples: boolean, ...createCreateAttractionRequest: object[]) : CreateAttractionRequest[] {
		const returnCreateAttractionRequests : CreateAttractionRequest[] = [];
		createCreateAttractionRequest.forEach(element => {
			returnCreateAttractionRequests.push(fakeCreateAttractionRequest(useExamples, element));
		});
		return returnCreateAttractionRequests;
	}
	