/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateTagRequest
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateTagRequest, schemaForCreateTagRequest } from "../models/CreateTagRequest.generated";

	import { schemaForTag } from '../models/Tag.generated';
	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeCreateTagRequest(useExamples: boolean, specifiedPropertiesForCreateTagRequest: object = {}): CreateTagRequest {
		const schema = schemaForCreateTagRequest as Schema;
		const refs : Schema[] = [
			schemaForTag as Schema,
			schemaForMetadata as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateTagRequest: CreateTagRequest = JSONSchemaFaker.generate(schema, refs) as CreateTagRequest;
		// @ts-ignore
		const returnCreateTagRequest = { ...fakeCreateTagRequest, ...specifiedPropertiesForCreateTagRequest };
		return returnCreateTagRequest;
	}

	export function fakeCreateTagRequests(useExamples: boolean, ...createCreateTagRequest: object[]) : CreateTagRequest[] {
		const returnCreateTagRequests : CreateTagRequest[] = [];
		createCreateTagRequest.forEach(element => {
			returnCreateTagRequests.push(fakeCreateTagRequest(useExamples, element));
		});
		return returnCreateTagRequests;
	}
	