/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/TranslatableField
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { TranslatableField, schemaForTranslatableField } from "../models/TranslatableField.generated";


	export function fakeTranslatableField(useExamples: boolean, specifiedPropertiesForTranslatableField: object = {}): TranslatableField {
		const schema = schemaForTranslatableField as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeTranslatableField: TranslatableField = JSONSchemaFaker.generate(schema, refs) as TranslatableField;
		// @ts-ignore
		const returnTranslatableField = { ...fakeTranslatableField, ...specifiedPropertiesForTranslatableField };
		return returnTranslatableField;
	}

	export function fakeTranslatableFields(useExamples: boolean, ...createTranslatableField: object[]) : TranslatableField[] {
		const returnTranslatableFields : TranslatableField[] = [];
		createTranslatableField.forEach(element => {
			returnTranslatableFields.push(fakeTranslatableField(useExamples, element));
		});
		return returnTranslatableFields;
	}
	