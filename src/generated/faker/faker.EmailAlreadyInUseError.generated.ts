/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/EmailAlreadyInUseError
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { EmailAlreadyInUseError, schemaForEmailAlreadyInUseError } from "../models/EmailAlreadyInUseError.generated";


	export function fakeEmailAlreadyInUseError(useExamples: boolean, specifiedPropertiesForEmailAlreadyInUseError: object = {}): EmailAlreadyInUseError {
		const schema = schemaForEmailAlreadyInUseError as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeEmailAlreadyInUseError: EmailAlreadyInUseError = JSONSchemaFaker.generate(schema, refs) as EmailAlreadyInUseError;
		// @ts-ignore
		const returnEmailAlreadyInUseError = { ...fakeEmailAlreadyInUseError, ...specifiedPropertiesForEmailAlreadyInUseError };
		return returnEmailAlreadyInUseError;
	}

	export function fakeEmailAlreadyInUseErrors(useExamples: boolean, ...createEmailAlreadyInUseError: object[]) : EmailAlreadyInUseError[] {
		const returnEmailAlreadyInUseErrors : EmailAlreadyInUseError[] = [];
		createEmailAlreadyInUseError.forEach(element => {
			returnEmailAlreadyInUseErrors.push(fakeEmailAlreadyInUseError(useExamples, element));
		});
		return returnEmailAlreadyInUseErrors;
	}
	