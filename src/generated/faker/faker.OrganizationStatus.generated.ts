/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/OrganizationStatus
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { OrganizationStatus, schemaForOrganizationStatus } from "../models/OrganizationStatus.generated";


	export function fakeOrganizationStatus(useExamples: boolean, specifiedPropertiesForOrganizationStatus: object = {}): OrganizationStatus {
		const schema = schemaForOrganizationStatus as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeOrganizationStatus: OrganizationStatus = JSONSchemaFaker.generate(schema, refs) as OrganizationStatus;
		// @ts-ignore
		const returnOrganizationStatus = { ...fakeOrganizationStatus, ...specifiedPropertiesForOrganizationStatus };
		return returnOrganizationStatus;
	}

	export function fakeOrganizationStatuss(useExamples: boolean, ...createOrganizationStatus: object[]) : OrganizationStatus[] {
		const returnOrganizationStatuss : OrganizationStatus[] = [];
		createOrganizationStatus.forEach(element => {
			returnOrganizationStatuss.push(fakeOrganizationStatus(useExamples, element));
		});
		return returnOrganizationStatuss;
	}
	