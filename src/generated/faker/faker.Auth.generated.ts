
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Auth, schemaForAuth } from "../models/Auth.generated";

	import { schemaForReference } from '../models/Reference.generated';

	export function fakeAuth(specifiedPropertiesForAuth: object = {}): Auth {
		const schema = schemaForAuth as Schema;
		const refs : Schema[] = [
			schemaForReference as Schema,

		];
		// @ts-ignore
		const fakeAuth: Auth = JSONSchemaFaker.generate(schema, refs) as Auth;
		// @ts-ignore
		const returnAuth = { ...fakeAuth, ...specifiedPropertiesForAuth };
		return returnAuth;
	}

	export function fakeAuths(...createAuth: object[]) : Auth[] {
		const returnAuths : Auth[] = [];
		createAuth.forEach(element => {
			returnAuths.push(fakeAuth(element));
		});
		return returnAuths;
	}
	