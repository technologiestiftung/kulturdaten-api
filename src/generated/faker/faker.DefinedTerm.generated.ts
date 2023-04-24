
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { DefinedTerm, schemaForDefinedTerm } from "../models/DefinedTerm.generated";

	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeDefinedTerm(useExamples: boolean, specifiedPropertiesForDefinedTerm: object = {}): DefinedTerm {
		const schema = schemaForDefinedTerm as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,
			schemaForShortText as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeDefinedTerm: DefinedTerm = JSONSchemaFaker.generate(schema, refs) as DefinedTerm;
		// @ts-ignore
		const returnDefinedTerm = { ...fakeDefinedTerm, ...specifiedPropertiesForDefinedTerm };
		return returnDefinedTerm;
	}

	export function fakeDefinedTerms(useExamples: boolean, ...createDefinedTerm: object[]) : DefinedTerm[] {
		const returnDefinedTerms : DefinedTerm[] = [];
		createDefinedTerm.forEach(element => {
			returnDefinedTerms.push(fakeDefinedTerm(useExamples, element));
		});
		return returnDefinedTerms;
	}
	