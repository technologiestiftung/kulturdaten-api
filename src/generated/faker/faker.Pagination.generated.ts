/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Pagination
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Pagination, schemaForPagination } from "../models/Pagination.generated";


	export function fakePagination(useExamples: boolean, specifiedPropertiesForPagination: object = {}): Pagination {
		const schema = schemaForPagination as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakePagination: Pagination = JSONSchemaFaker.generate(schema, refs) as Pagination;
		// @ts-ignore
		const returnPagination = { ...fakePagination, ...specifiedPropertiesForPagination };
		return returnPagination;
	}

	export function fakePaginations(useExamples: boolean, ...createPagination: object[]) : Pagination[] {
		const returnPaginations : Pagination[] = [];
		createPagination.forEach(element => {
			returnPaginations.push(fakePagination(useExamples, element));
		});
		return returnPaginations;
	}
	