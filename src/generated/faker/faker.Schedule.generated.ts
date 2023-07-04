/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Schedule
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Schedule, schemaForSchedule } from "../models/Schedule.generated";


	export function fakeSchedule(useExamples: boolean, specifiedPropertiesForSchedule: object = {}): Schedule {
		const schema = schemaForSchedule as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeSchedule: Schedule = JSONSchemaFaker.generate(schema, refs) as Schedule;
		// @ts-ignore
		const returnSchedule = { ...fakeSchedule, ...specifiedPropertiesForSchedule };
		return returnSchedule;
	}

	export function fakeSchedules(useExamples: boolean, ...createSchedule: object[]) : Schedule[] {
		const returnSchedules : Schedule[] = [];
		createSchedule.forEach(element => {
			returnSchedules.push(fakeSchedule(useExamples, element));
		});
		return returnSchedules;
	}
	