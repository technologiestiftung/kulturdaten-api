/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Admission
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Admission, schemaForAdmission } from "../models/Admission.generated";

	import { schemaForTranslatableField } from '../models/TranslatableField.generated';

	export function fakeAdmission(useExamples: boolean, specifiedPropertiesForAdmission: object = {}): Admission {
		const schema = schemaForAdmission as Schema;
		const refs : Schema[] = [
			schemaForTranslatableField as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAdmission: Admission = JSONSchemaFaker.generate(schema, refs) as Admission;
		// @ts-ignore
		const returnAdmission = { ...fakeAdmission, ...specifiedPropertiesForAdmission };
		return returnAdmission;
	}

	export function fakeAdmissions(useExamples: boolean, ...createAdmission: object[]) : Admission[] {
		const returnAdmissions : Admission[] = [];
		createAdmission.forEach(element => {
			returnAdmissions.push(fakeAdmission(useExamples, element));
		});
		return returnAdmissions;
	}
	