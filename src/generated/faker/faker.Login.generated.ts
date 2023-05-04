/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Login
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Login, schemaForLogin } from "../models/Login.generated";


	export function fakeLogin(useExamples: boolean, specifiedPropertiesForLogin: object = {}): Login {
		const schema = schemaForLogin as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeLogin: Login = JSONSchemaFaker.generate(schema, refs) as Login;
		// @ts-ignore
		const returnLogin = { ...fakeLogin, ...specifiedPropertiesForLogin };
		return returnLogin;
	}

	export function fakeLogins(useExamples: boolean, ...createLogin: object[]) : Login[] {
		const returnLogins : Login[] = [];
		createLogin.forEach(element => {
			returnLogins.push(fakeLogin(useExamples, element));
		});
		return returnLogins;
	}
	