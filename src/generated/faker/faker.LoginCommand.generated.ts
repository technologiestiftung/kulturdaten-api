/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/LoginCommand
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { LoginCommand, schemaForLoginCommand } from "../models/LoginCommand.generated";


	export function fakeLoginCommand(useExamples: boolean, specifiedPropertiesForLoginCommand: object = {}): LoginCommand {
		const schema = schemaForLoginCommand as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeLoginCommand: LoginCommand = JSONSchemaFaker.generate(schema, refs) as LoginCommand;
		// @ts-ignore
		const returnLoginCommand = { ...fakeLoginCommand, ...specifiedPropertiesForLoginCommand };
		return returnLoginCommand;
	}

	export function fakeLoginCommands(useExamples: boolean, ...createLoginCommand: object[]) : LoginCommand[] {
		const returnLoginCommands : LoginCommand[] = [];
		createLoginCommand.forEach(element => {
			returnLoginCommands.push(fakeLoginCommand(useExamples, element));
		});
		return returnLoginCommands;
	}
	