/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/EventStatus
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { EventStatus, schemaForEventStatus } from "../models/EventStatus.generated";


	export function fakeEventStatus(useExamples: boolean, specifiedPropertiesForEventStatus: object = {}): EventStatus {
		const schema = schemaForEventStatus as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeEventStatus: EventStatus = JSONSchemaFaker.generate(schema, refs) as EventStatus;
		// @ts-ignore
		const returnEventStatus = { ...fakeEventStatus, ...specifiedPropertiesForEventStatus };
		return returnEventStatus;
	}

	export function fakeEventStatuss(useExamples: boolean, ...createEventStatus: object[]) : EventStatus[] {
		const returnEventStatuss : EventStatus[] = [];
		createEventStatus.forEach(element => {
			returnEventStatuss.push(fakeEventStatus(useExamples, element));
		});
		return returnEventStatuss;
	}
	