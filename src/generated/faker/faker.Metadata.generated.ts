/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Metadata
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Metadata, schemaForMetadata } from "../models/Metadata.generated";


	export function fakeMetadata(useExamples: boolean, specifiedPropertiesForMetadata: object = {}): Metadata {
		const schema = schemaForMetadata as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeMetadata: Metadata = JSONSchemaFaker.generate(schema, refs) as Metadata;
		// @ts-ignore
		const returnMetadata = { ...fakeMetadata, ...specifiedPropertiesForMetadata };
		return returnMetadata;
	}

	export function fakeMetadatas(useExamples: boolean, ...createMetadata: object[]) : Metadata[] {
		const returnMetadatas : Metadata[] = [];
		createMetadata.forEach(element => {
			returnMetadatas.push(fakeMetadata(useExamples, element));
		});
		return returnMetadatas;
	}
	