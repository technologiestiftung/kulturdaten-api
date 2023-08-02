/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Borough
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Borough, schemaForBorough } from "../models/Borough.generated";


	export function fakeBorough(useExamples: boolean, specifiedPropertiesForBorough: object = {}): Borough {
		const schema = schemaForBorough as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeBorough: Borough = JSONSchemaFaker.generate(schema, refs) as Borough;
		// @ts-ignore
		const returnBorough = { ...fakeBorough, ...specifiedPropertiesForBorough };
		return returnBorough;
	}

	export function fakeBoroughs(useExamples: boolean, ...createBorough: object[]) : Borough[] {
		const returnBoroughs : Borough[] = [];
		createBorough.forEach(element => {
			returnBoroughs.push(fakeBorough(useExamples, element));
		});
		return returnBoroughs;
	}
	