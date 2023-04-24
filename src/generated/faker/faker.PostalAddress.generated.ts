
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { PostalAddress, schemaForPostalAddress } from "../models/PostalAddress.generated";


	export function fakePostalAddress(useExamples: boolean, specifiedPropertiesForPostalAddress: object = {}): PostalAddress {
		const schema = schemaForPostalAddress as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakePostalAddress: PostalAddress = JSONSchemaFaker.generate(schema, refs) as PostalAddress;
		// @ts-ignore
		const returnPostalAddress = { ...fakePostalAddress, ...specifiedPropertiesForPostalAddress };
		return returnPostalAddress;
	}

	export function fakePostalAddresss(useExamples: boolean, ...createPostalAddress: object[]) : PostalAddress[] {
		const returnPostalAddresss : PostalAddress[] = [];
		createPostalAddress.forEach(element => {
			returnPostalAddresss.push(fakePostalAddress(useExamples, element));
		});
		return returnPostalAddresss;
	}
	