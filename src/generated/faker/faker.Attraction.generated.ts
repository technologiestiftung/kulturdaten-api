/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Attraction
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Attraction, schemaForAttraction } from "../models/Attraction.generated";

	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForTranslatableField } from '../models/TranslatableField.generated';
	import { schemaForExternalLinks } from '../models/ExternalLinks.generated';

	export function fakeAttraction(useExamples: boolean, specifiedPropertiesForAttraction: object = {}): Attraction {
		const schema = schemaForAttraction as Schema;
		const refs : Schema[] = [
			schemaForMetadata as Schema,
			schemaForTranslatableField as Schema,
			schemaForExternalLinks as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAttraction: Attraction = JSONSchemaFaker.generate(schema, refs) as Attraction;
		// @ts-ignore
		const returnAttraction = { ...fakeAttraction, ...specifiedPropertiesForAttraction };
		return returnAttraction;
	}

	export function fakeAttractions(useExamples: boolean, ...createAttraction: object[]) : Attraction[] {
		const returnAttractions : Attraction[] = [];
		createAttraction.forEach(element => {
			returnAttractions.push(fakeAttraction(useExamples, element));
		});
		return returnAttractions;
	}
	