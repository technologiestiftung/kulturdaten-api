/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/ExternalLinks
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ExternalLinks, schemaForExternalLinks } from "../models/ExternalLinks.generated";


	export function fakeExternalLinks(useExamples: boolean, specifiedPropertiesForExternalLinks: object = {}): ExternalLinks {
		const schema = schemaForExternalLinks as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeExternalLinks: ExternalLinks = JSONSchemaFaker.generate(schema, refs) as ExternalLinks;
		// @ts-ignore
		const returnExternalLinks = { ...fakeExternalLinks, ...specifiedPropertiesForExternalLinks };
		return returnExternalLinks;
	}

	export function fakeExternalLinkss(useExamples: boolean, ...createExternalLinks: object[]) : ExternalLinks[] {
		const returnExternalLinkss : ExternalLinks[] = [];
		createExternalLinks.forEach(element => {
			returnExternalLinkss.push(fakeExternalLinks(useExamples, element));
		});
		return returnExternalLinkss;
	}
	