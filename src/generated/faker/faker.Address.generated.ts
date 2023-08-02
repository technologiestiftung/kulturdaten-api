/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Address
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Address, schemaForAddress } from "../models/Address.generated";


	export function fakeAddress(useExamples: boolean, specifiedPropertiesForAddress: object = {}): Address {
		const schema = schemaForAddress as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAddress: Address = JSONSchemaFaker.generate(schema, refs) as Address;
		// @ts-ignore
		const returnAddress = { ...fakeAddress, ...specifiedPropertiesForAddress };
		return returnAddress;
	}

	export function fakeAddresss(useExamples: boolean, ...createAddress: object[]) : Address[] {
		const returnAddresss : Address[] = [];
		createAddress.forEach(element => {
			returnAddresss.push(fakeAddress(useExamples, element));
		});
		return returnAddresss;
	}
	