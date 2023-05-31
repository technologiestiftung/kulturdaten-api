/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/EventClassification
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { EventClassification, schemaForEventClassification } from "../models/EventClassification.generated";


	export function fakeEventClassification(useExamples: boolean, specifiedPropertiesForEventClassification: object = {}): EventClassification {
		const schema = schemaForEventClassification as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeEventClassification: EventClassification = JSONSchemaFaker.generate(schema, refs) as EventClassification;
		// @ts-ignore
		const returnEventClassification = { ...fakeEventClassification, ...specifiedPropertiesForEventClassification };
		return returnEventClassification;
	}

	export function fakeEventClassifications(useExamples: boolean, ...createEventClassification: object[]) : EventClassification[] {
		const returnEventClassifications : EventClassification[] = [];
		createEventClassification.forEach(element => {
			returnEventClassifications.push(fakeEventClassification(useExamples, element));
		});
		return returnEventClassifications;
	}
	