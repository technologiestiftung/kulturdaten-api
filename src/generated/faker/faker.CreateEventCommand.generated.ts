/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateEventCommand
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateEventCommand, schemaForCreateEventCommand } from "../models/CreateEventCommand.generated";

	import { schemaForEventSchedule } from '../models/EventSchedule.generated';
	import { schemaForEventAdmission } from '../models/EventAdmission.generated';
	import { schemaForEventProfile } from '../models/EventProfile.generated';
	import { schemaForEventClassification } from '../models/EventClassification.generated';
	import { schemaForEventStatus } from '../models/EventStatus.generated';

	export function fakeCreateEventCommand(useExamples: boolean, specifiedPropertiesForCreateEventCommand: object = {}): CreateEventCommand {
		const schema = schemaForCreateEventCommand as Schema;
		const refs : Schema[] = [
			schemaForEventSchedule as Schema,
			schemaForEventAdmission as Schema,
			schemaForEventProfile as Schema,
			schemaForEventClassification as Schema,
			schemaForEventStatus as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateEventCommand: CreateEventCommand = JSONSchemaFaker.generate(schema, refs) as CreateEventCommand;
		// @ts-ignore
		const returnCreateEventCommand = { ...fakeCreateEventCommand, ...specifiedPropertiesForCreateEventCommand };
		return returnCreateEventCommand;
	}

	export function fakeCreateEventCommands(useExamples: boolean, ...createCreateEventCommand: object[]) : CreateEventCommand[] {
		const returnCreateEventCommands : CreateEventCommand[] = [];
		createCreateEventCommand.forEach(element => {
			returnCreateEventCommands.push(fakeCreateEventCommand(useExamples, element));
		});
		return returnCreateEventCommands;
	}
	