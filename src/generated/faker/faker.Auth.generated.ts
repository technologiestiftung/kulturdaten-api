
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Auth, schemaForAuth } from "../models/Auth.generated";

	import { schemaForReference } from '../models/Reference.generated';

	export function fakeAuth(useExamples: boolean, specifiedPropertiesForAuth: object = {}): Auth {
		const schema = schemaForAuth as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeAuth: Auth = JSONSchemaFaker.generate(schema, refs) as Auth;
		// @ts-ignore
		const returnAuth = { ...fakeAuth, ...specifiedPropertiesForAuth };
		return returnAuth;
	}

	export function fakeAuths(useExamples: boolean, ...createAuth: object[]) : Auth[] {
		const returnAuths : Auth[] = [];
		createAuth.forEach(element => {
			returnAuths.push(fakeAuth(useExamples, element));
		});
		return returnAuths;
	}
	