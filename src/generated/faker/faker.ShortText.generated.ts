
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ShortText, schemaForShortText } from "../models/ShortText.generated";


	export function fakeShortText(useExamples: boolean, specifiedPropertiesForShortText: object = {}): ShortText {
		const schema = schemaForShortText as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeShortText: ShortText = JSONSchemaFaker.generate(schema, refs) as ShortText;
		// @ts-ignore
		const returnShortText = { ...fakeShortText, ...specifiedPropertiesForShortText };
		return returnShortText;
	}

	export function fakeShortTexts(useExamples: boolean, ...createShortText: object[]) : ShortText[] {
		const returnShortTexts : ShortText[] = [];
		createShortText.forEach(element => {
			returnShortTexts.push(fakeShortText(useExamples, element));
		});
		return returnShortTexts;
	}
	