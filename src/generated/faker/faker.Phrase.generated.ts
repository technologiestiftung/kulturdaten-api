
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Phrase, schemaForPhrase } from "../models/Phrase.generated";


	export function fakePhrase(specifiedPropertiesForPhrase: object = {}): Phrase {
		const schema = schemaForPhrase as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakePhrase: Phrase = JSONSchemaFaker.generate(schema, refs) as Phrase;
		// @ts-ignore
		const returnPhrase = { ...fakePhrase, ...specifiedPropertiesForPhrase };
		return returnPhrase;
	}

	export function fakePhrases(...createPhrase: object[]) : Phrase[] {
		const returnPhrases : Phrase[] = [];
		createPhrase.forEach(element => {
			returnPhrases.push(fakePhrase(element));
		});
		return returnPhrases;
	}
	