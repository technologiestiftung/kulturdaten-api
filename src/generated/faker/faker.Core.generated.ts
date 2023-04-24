
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Core, schemaForCore } from "../models/Core.generated";


	export function fakeCore(useExamples: boolean, specifiedPropertiesForCore: object = {}): Core {
		const schema = schemaForCore as Schema;
		const refs : Schema[] = [

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
	