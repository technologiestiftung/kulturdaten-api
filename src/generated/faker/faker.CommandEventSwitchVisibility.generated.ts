/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CommandEventSwitchVisibility
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CommandEventSwitchVisibility, schemaForCommandEventSwitchVisibility } from "../models/CommandEventSwitchVisibility.generated";


	export function fakeCommandEventSwitchVisibility(useExamples: boolean, specifiedPropertiesForCommandEventSwitchVisibility: object = {}): CommandEventSwitchVisibility {
		const schema = schemaForCommandEventSwitchVisibility as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCommandEventSwitchVisibility: CommandEventSwitchVisibility = JSONSchemaFaker.generate(schema, refs) as CommandEventSwitchVisibility;
		// @ts-ignore
		const returnCommandEventSwitchVisibility = { ...fakeCommandEventSwitchVisibility, ...specifiedPropertiesForCommandEventSwitchVisibility };
		return returnCommandEventSwitchVisibility;
	}

	export function fakeCommandEventSwitchVisibilitys(useExamples: boolean, ...createCommandEventSwitchVisibility: object[]) : CommandEventSwitchVisibility[] {
		const returnCommandEventSwitchVisibilitys : CommandEventSwitchVisibility[] = [];
		createCommandEventSwitchVisibility.forEach(element => {
			returnCommandEventSwitchVisibilitys.push(fakeCommandEventSwitchVisibility(useExamples, element));
		});
		return returnCommandEventSwitchVisibilitys;
	}
	