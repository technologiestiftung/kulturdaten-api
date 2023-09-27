/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateTagResponse
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateTagResponse, schemaForCreateTagResponse } from "../models/CreateTagResponse.generated";

	import { schemaForTag } from '../models/Tag.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeCreateTagResponse(useExamples: boolean, specifiedPropertiesForCreateTagResponse: object = {}): CreateTagResponse {
		const schema = schemaForCreateTagResponse as Schema;
		const refs : Schema[] = [
			schemaForTag as Schema,
			schemaForTranslatableField as Schema,
			schemaForMetadata as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateTagResponse: CreateTagResponse = JSONSchemaFaker.generate(schema, refs) as CreateTagResponse;
		// @ts-ignore
		const returnCreateTagResponse = { ...fakeCreateTagResponse, ...specifiedPropertiesForCreateTagResponse };
		return returnCreateTagResponse;
	}

	export function fakeCreateTagResponses(useExamples: boolean, ...createCreateTagResponse: object[]) : CreateTagResponse[] {
		const returnCreateTagResponses : CreateTagResponse[] = [];
		createCreateTagResponse.forEach(element => {
			returnCreateTagResponses.push(fakeCreateTagResponse(useExamples, element));
		});
		return returnCreateTagResponses;
	}
	