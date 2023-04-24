
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Borough, schemaForBorough } from "../models/Borough.generated";


	export function fakeBorough(specifiedPropertiesForBorough: object = {}): Borough {
		const schema = schemaForBorough as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeBorough: Borough = JSONSchemaFaker.generate(schema, refs) as Borough;
		// @ts-ignore
		const returnBorough = { ...fakeBorough, ...specifiedPropertiesForBorough };
		return returnBorough;
	}

	export function fakeBoroughs(...createBorough: object[]) : Borough[] {
		const returnBoroughs : Borough[] = [];
		createBorough.forEach(element => {
			returnBoroughs.push(fakeBorough(element));
		});
		return returnBoroughs;
	}
	