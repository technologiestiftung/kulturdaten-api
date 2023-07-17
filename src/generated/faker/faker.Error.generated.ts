/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Error
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Error, schemaForError } from "../models/Error.generated";


	export function fakeError(useExamples: boolean, specifiedPropertiesForError: object = {}): Error {
		const schema = schemaForError as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeError: Error = JSONSchemaFaker.generate(schema, refs) as Error;
		// @ts-ignore
		const returnError = { ...fakeError, ...specifiedPropertiesForError };
		return returnError;
	}

	export function fakeErrors(useExamples: boolean, ...createError: object[]) : Error[] {
		const returnErrors : Error[] = [];
		createError.forEach(element => {
			returnErrors.push(fakeError(useExamples, element));
		});
		return returnErrors;
	}
	