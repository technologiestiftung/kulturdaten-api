/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/AttractionStatus
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { AttractionStatus, schemaForAttractionStatus } from "../models/AttractionStatus.generated";


	export function fakeAttractionStatus(useExamples: boolean, specifiedPropertiesForAttractionStatus: object = {}): AttractionStatus {
		const schema = schemaForAttractionStatus as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAttractionStatus: AttractionStatus = JSONSchemaFaker.generate(schema, refs) as AttractionStatus;
		// @ts-ignore
		const returnAttractionStatus = { ...fakeAttractionStatus, ...specifiedPropertiesForAttractionStatus };
		return returnAttractionStatus;
	}

	export function fakeAttractionStatuss(useExamples: boolean, ...createAttractionStatus: object[]) : AttractionStatus[] {
		const returnAttractionStatuss : AttractionStatus[] = [];
		createAttractionStatus.forEach(element => {
			returnAttractionStatuss.push(fakeAttractionStatus(useExamples, element));
		});
		return returnAttractionStatuss;
	}
	