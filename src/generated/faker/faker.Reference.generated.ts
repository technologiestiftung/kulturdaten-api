
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Reference, schemaForReference } from "../models/Reference.generated";


	export function fakeReference(useExamples: boolean, specifiedPropertiesForReference: object = {}): Reference {
		const schema = schemaForReference as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeReference: Reference = JSONSchemaFaker.generate(schema, refs) as Reference;
		// @ts-ignore
		const returnReference = { ...fakeReference, ...specifiedPropertiesForReference };
		return returnReference;
	}

	export function fakeReferences(useExamples: boolean, ...createReference: object[]) : Reference[] {
		const returnReferences : Reference[] = [];
		createReference.forEach(element => {
			returnReferences.push(fakeReference(useExamples, element));
		});
		return returnReferences;
	}
	