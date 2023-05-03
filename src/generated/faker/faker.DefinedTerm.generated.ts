/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/DefinedTerm
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

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
	