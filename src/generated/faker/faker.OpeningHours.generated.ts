/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/OpeningHours
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { OpeningHours, schemaForOpeningHours } from "../models/OpeningHours.generated";


	export function fakeOpeningHours(useExamples: boolean, specifiedPropertiesForOpeningHours: object = {}): OpeningHours {
		const schema = schemaForOpeningHours as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeOpeningHours: OpeningHours = JSONSchemaFaker.generate(schema, refs) as OpeningHours;
		// @ts-ignore
		const returnOpeningHours = { ...fakeOpeningHours, ...specifiedPropertiesForOpeningHours };
		return returnOpeningHours;
	}

	export function fakeOpeningHourss(useExamples: boolean, ...createOpeningHours: object[]) : OpeningHours[] {
		const returnOpeningHourss : OpeningHours[] = [];
		createOpeningHours.forEach(element => {
			returnOpeningHourss.push(fakeOpeningHours(useExamples, element));
		});
		return returnOpeningHourss;
	}
	