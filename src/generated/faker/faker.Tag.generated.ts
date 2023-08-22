/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Tag
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Tag, schemaForTag } from "../models/Tag.generated";

	import { schemaForMetadata } from '../models/Metadata.generated';

	export function fakeTag(useExamples: boolean, specifiedPropertiesForTag: object = {}): Tag {
		const schema = schemaForTag as Schema;
		const refs : Schema[] = [
			schemaForMetadata as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeTag: Tag = JSONSchemaFaker.generate(schema, refs) as Tag;
		// @ts-ignore
		const returnTag = { ...fakeTag, ...specifiedPropertiesForTag };
		return returnTag;
	}

	export function fakeTags(useExamples: boolean, ...createTag: object[]) : Tag[] {
		const returnTags : Tag[] = [];
		createTag.forEach(element => {
			returnTags.push(fakeTag(useExamples, element));
		});
		return returnTags;
	}
	