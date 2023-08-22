/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/GetTagResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GetTagResponse, schemaForGetTagResponse } from "../models/GetTagResponse.generated";

	import { schemaForTag } from '../models/Tag.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeGetTagResponse(useExamples: boolean, specifiedPropertiesForGetTagResponse: object = {}): GetTagResponse {
		const schema = schemaForGetTagResponse as Schema;
		const refs : Schema[] = [
			schemaForTag as Schema,
			schemaForMetadata as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGetTagResponse: GetTagResponse = JSONSchemaFaker.generate(schema, refs) as GetTagResponse;
		// @ts-ignore
		const returnGetTagResponse = { ...fakeGetTagResponse, ...specifiedPropertiesForGetTagResponse };
		return returnGetTagResponse;
	}

	export function fakeGetTagResponses(useExamples: boolean, ...createGetTagResponse: object[]) : GetTagResponse[] {
		const returnGetTagResponses : GetTagResponse[] = [];
		createGetTagResponse.forEach(element => {
			returnGetTagResponses.push(fakeGetTagResponse(useExamples, element));
		});
		return returnGetTagResponses;
	}
	