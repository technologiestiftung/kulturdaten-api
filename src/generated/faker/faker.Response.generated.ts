/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Response
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Response, schemaForResponse } from "../models/Response.generated";

	import { schemaForError } from '../models/Error.generated';

	export function fakeResponse(useExamples: boolean, specifiedPropertiesForResponse: object = {}): Response {
		const schema = schemaForResponse as Schema;
		const refs : Schema[] = [
			schemaForError as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeResponse: Response = JSONSchemaFaker.generate(schema, refs) as Response;
		// @ts-ignore
		const returnResponse = { ...fakeResponse, ...specifiedPropertiesForResponse };
		return returnResponse;
	}

	export function fakeResponses(useExamples: boolean, ...createResponse: object[]) : Response[] {
		const returnResponses : Response[] = [];
		createResponse.forEach(element => {
			returnResponses.push(fakeResponse(useExamples, element));
		});
		return returnResponses;
	}
	