/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CommandEventCreate
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CommandEventCreate, schemaForCommandEventCreate } from "../models/CommandEventCreate.generated";

	import { schemaForEventSchedule } from '../models/EventSchedule.generated';
	import { schemaForEventAdmission } from '../models/EventAdmission.generated';
	import { schemaForEventProfile } from '../models/EventProfile.generated';
	import { schemaForEventClassification } from '../models/EventClassification.generated';
	import { schemaForEventStatus } from '../models/EventStatus.generated';

	export function fakeCommandEventCreate(useExamples: boolean, specifiedPropertiesForCommandEventCreate: object = {}): CommandEventCreate {
		const schema = schemaForCommandEventCreate as Schema;
		const refs : Schema[] = [
			schemaForEventSchedule as Schema,
			schemaForEventAdmission as Schema,
			schemaForEventProfile as Schema,
			schemaForEventClassification as Schema,
			schemaForEventStatus as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCommandEventCreate: CommandEventCreate = JSONSchemaFaker.generate(schema, refs) as CommandEventCreate;
		// @ts-ignore
		const returnCommandEventCreate = { ...fakeCommandEventCreate, ...specifiedPropertiesForCommandEventCreate };
		return returnCommandEventCreate;
	}

	export function fakeCommandEventCreates(useExamples: boolean, ...createCommandEventCreate: object[]) : CommandEventCreate[] {
		const returnCommandEventCreates : CommandEventCreate[] = [];
		createCommandEventCreate.forEach(element => {
			returnCommandEventCreates.push(fakeCommandEventCreate(useExamples, element));
		});
		return returnCommandEventCreates;
	}
	