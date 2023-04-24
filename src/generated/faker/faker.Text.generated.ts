
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Text, schemaForText } from "../models/Text.generated";


	export function fakeText(specifiedPropertiesForText: object = {}): Text {
		const schema = schemaForText as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeText: Text = JSONSchemaFaker.generate(schema, refs) as Text;
		// @ts-ignore
		const returnText = { ...fakeText, ...specifiedPropertiesForText };
		return returnText;
	}

	export function fakeTexts(...createText: object[]) : Text[] {
		const returnTexts : Text[] = [];
		createText.forEach(element => {
			returnTexts.push(fakeText(element));
		});
		return returnTexts;
	}
	