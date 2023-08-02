/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateAttractionResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateAttractionResponse, schemaForCreateAttractionResponse } from "../models/CreateAttractionResponse.generated";

	import { schemaForReference } from '../models/Reference.generated';

	export function fakeCreateAttractionResponse(useExamples: boolean, specifiedPropertiesForCreateAttractionResponse: object = {}): CreateAttractionResponse {
		const schema = schemaForCreateAttractionResponse as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateAttractionResponse: CreateAttractionResponse = JSONSchemaFaker.generate(schema, refs) as CreateAttractionResponse;
		// @ts-ignore
		const returnCreateAttractionResponse = { ...fakeCreateAttractionResponse, ...specifiedPropertiesForCreateAttractionResponse };
		return returnCreateAttractionResponse;
	}

	export function fakeCreateAttractionResponses(useExamples: boolean, ...createCreateAttractionResponse: object[]) : CreateAttractionResponse[] {
		const returnCreateAttractionResponses : CreateAttractionResponse[] = [];
		createCreateAttractionResponse.forEach(element => {
			returnCreateAttractionResponses.push(fakeCreateAttractionResponse(useExamples, element));
		});
		return returnCreateAttractionResponses;
	}
	