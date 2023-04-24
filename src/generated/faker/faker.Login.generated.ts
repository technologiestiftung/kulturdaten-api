
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
	