/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Core
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Core, schemaForCore } from "../models/Core.generated";

	import { schemaForOrigin } from '../models/Origin.generated';

	export function fakeCore(useExamples: boolean, specifiedPropertiesForCore: object = {}): Core {
		const schema = schemaForCore as Schema;
		const refs : Schema[] = [
			schemaForOrigin as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCore: Core = JSONSchemaFaker.generate(schema, refs) as Core;
		// @ts-ignore
		const returnCore = { ...fakeCore, ...specifiedPropertiesForCore };
		return returnCore;
	}

	export function fakeCores(useExamples: boolean, ...createCore: object[]) : Core[] {
		const returnCores : Core[] = [];
		createCore.forEach(element => {
			returnCores.push(fakeCore(useExamples, element));
		});
		return returnCores;
	}
	