
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { DefinedTermSet, schemaForDefinedTermSet } from "../models/DefinedTermSet.generated";

	import { schemaForCore } from '../models/Core.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeDefinedTermSet(specifiedPropertiesForDefinedTermSet: object = {}): DefinedTermSet {
		const schema = schemaForDefinedTermSet as Schema;
		const refs : Schema[] = [
			schemaForCore as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,
			schemaForShortText as Schema,

		];
		// @ts-ignore
		const fakeDefinedTermSet: DefinedTermSet = JSONSchemaFaker.generate(schema, refs) as DefinedTermSet;
		// @ts-ignore
		const returnDefinedTermSet = { ...fakeDefinedTermSet, ...specifiedPropertiesForDefinedTermSet };
		return returnDefinedTermSet;
	}

	export function fakeDefinedTermSets(...createDefinedTermSet: object[]) : DefinedTermSet[] {
		const returnDefinedTermSets : DefinedTermSet[] = [];
		createDefinedTermSet.forEach(element => {
			returnDefinedTermSets.push(fakeDefinedTermSet(element));
		});
		return returnDefinedTermSets;
	}
	