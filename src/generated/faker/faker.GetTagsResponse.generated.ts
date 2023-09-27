/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetTagsResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetTagsResponse, schemaForGetTagsResponse } from "../models/GetTagsResponse.generated";

	import { schemaForTag } from '../models/Tag.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeGetTagsResponse(useExamples: boolean, specifiedPropertiesForGetTagsResponse: object = {}): GetTagsResponse {
		const schema = schemaForGetTagsResponse as Schema;
		const refs : Schema[] = [
			schemaForTag as Schema,
			schemaForTranslatableField as Schema,
			schemaForMetadata as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetTagsResponse: GetTagsResponse = JSONSchemaFaker.generate(schema, refs) as GetTagsResponse;
		// @ts-ignore
		const returnGetTagsResponse = { ...fakeGetTagsResponse, ...specifiedPropertiesForGetTagsResponse };
		return returnGetTagsResponse;
	}

	export function fakeGetTagsResponses(useExamples: boolean, ...createGetTagsResponse: object[]) : GetTagsResponse[] {
		const returnGetTagsResponses : GetTagsResponse[] = [];
		createGetTagsResponse.forEach(element => {
			returnGetTagsResponses.push(fakeGetTagsResponse(useExamples, element));
		});
		return returnGetTagsResponses;
	}
	