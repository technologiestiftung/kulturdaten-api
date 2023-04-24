
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ShortText, schemaForShortText } from "../models/ShortText.generated";


	export function fakeShortText(specifiedPropertiesForShortText: object = {}): ShortText {
		const schema = schemaForShortText as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeShortText: ShortText = JSONSchemaFaker.generate(schema, refs) as ShortText;
		// @ts-ignore
		const returnShortText = { ...fakeShortText, ...specifiedPropertiesForShortText };
		return returnShortText;
	}

	export function fakeShortTexts(...createShortText: object[]) : ShortText[] {
		const returnShortTexts : ShortText[] = [];
		createShortText.forEach(element => {
			returnShortTexts.push(fakeShortText(element));
		});
		return returnShortTexts;
	}
	