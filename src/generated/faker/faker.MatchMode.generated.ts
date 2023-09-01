/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/MatchMode
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { MatchMode, schemaForMatchMode } from "../models/MatchMode.generated";


	export function fakeMatchMode(useExamples: boolean, specifiedPropertiesForMatchMode: object = {}): MatchMode {
		const schema = schemaForMatchMode as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeMatchMode: MatchMode = JSONSchemaFaker.generate(schema, refs) as MatchMode;
		// @ts-ignore
		const returnMatchMode = { ...fakeMatchMode, ...specifiedPropertiesForMatchMode };
		return returnMatchMode;
	}

	export function fakeMatchModes(useExamples: boolean, ...createMatchMode: object[]) : MatchMode[] {
		const returnMatchModes : MatchMode[] = [];
		createMatchMode.forEach(element => {
			returnMatchModes.push(fakeMatchMode(useExamples, element));
		});
		return returnMatchModes;
	}
	