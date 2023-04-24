
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Text, schemaForText } from "../models/Text.generated";


	export function fakeText(useExamples: boolean, specifiedPropertiesForText: object = {}): Text {
		const schema = schemaForText as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeText: Text = JSONSchemaFaker.generate(schema, refs) as Text;
		// @ts-ignore
		const returnText = { ...fakeText, ...specifiedPropertiesForText };
		return returnText;
	}

	export function fakeTexts(useExamples: boolean, ...createText: object[]) : Text[] {
		const returnTexts : Text[] = [];
		createText.forEach(element => {
			returnTexts.push(fakeText(useExamples, element));
		});
		return returnTexts;
	}
	