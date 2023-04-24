
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Health, schemaForHealth } from "../models/Health.generated";


	export function fakeHealth(useExamples: boolean, specifiedPropertiesForHealth: object = {}): Health {
		const schema = schemaForHealth as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeHealth: Health = JSONSchemaFaker.generate(schema, refs) as Health;
		// @ts-ignore
		const returnHealth = { ...fakeHealth, ...specifiedPropertiesForHealth };
		return returnHealth;
	}

	export function fakeHealths(useExamples: boolean, ...createHealth: object[]) : Health[] {
		const returnHealths : Health[] = [];
		createHealth.forEach(element => {
			returnHealths.push(fakeHealth(useExamples, element));
		});
		return returnHealths;
	}
	