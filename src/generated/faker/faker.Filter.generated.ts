/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Filter
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Filter, schemaForFilter } from "../models/Filter.generated";


	export function fakeFilter(useExamples: boolean, specifiedPropertiesForFilter: object = {}): Filter {
		const schema = schemaForFilter as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeFilter: Filter = JSONSchemaFaker.generate(schema, refs) as Filter;
		// @ts-ignore
		const returnFilter = { ...fakeFilter, ...specifiedPropertiesForFilter };
		return returnFilter;
	}

	export function fakeFilters(useExamples: boolean, ...createFilter: object[]) : Filter[] {
		const returnFilters : Filter[] = [];
		createFilter.forEach(element => {
			returnFilters.push(fakeFilter(useExamples, element));
		});
		return returnFilters;
	}
	