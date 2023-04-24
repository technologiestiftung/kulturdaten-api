
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { DefinedTerm, schemaForDefinedTerm } from "../models/DefinedTerm.generated";

	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeDefinedTerm(specifiedPropertiesForDefinedTerm: object = {}): DefinedTerm {
		const schema = schemaForDefinedTerm as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,
			schemaForShortText as Schema,

		];
		// @ts-ignore
		const fakeDefinedTerm: DefinedTerm = JSONSchemaFaker.generate(schema, refs) as DefinedTerm;
		// @ts-ignore
		const returnDefinedTerm = { ...fakeDefinedTerm, ...specifiedPropertiesForDefinedTerm };
		return returnDefinedTerm;
	}

	export function fakeDefinedTerms(...createDefinedTerm: object[]) : DefinedTerm[] {
		const returnDefinedTerms : DefinedTerm[] = [];
		createDefinedTerm.forEach(element => {
			returnDefinedTerms.push(fakeDefinedTerm(element));
		});
		return returnDefinedTerms;
	}
	