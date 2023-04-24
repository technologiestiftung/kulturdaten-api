
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Login, schemaForLogin } from "../models/Login.generated";


	export function fakeLogin(specifiedPropertiesForLogin: object = {}): Login {
		const schema = schemaForLogin as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeLogin: Login = JSONSchemaFaker.generate(schema, refs) as Login;
		// @ts-ignore
		const returnLogin = { ...fakeLogin, ...specifiedPropertiesForLogin };
		return returnLogin;
	}

	export function fakeLogins(...createLogin: object[]) : Login[] {
		const returnLogins : Login[] = [];
		createLogin.forEach(element => {
			returnLogins.push(fakeLogin(element));
		});
		return returnLogins;
	}
	