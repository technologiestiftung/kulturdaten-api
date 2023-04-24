
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateUser, schemaForCreateUser } from "../models/CreateUser.generated";


	export function fakeCreateUser(specifiedPropertiesForCreateUser: object = {}): CreateUser {
		const schema = schemaForCreateUser as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeCreateUser: CreateUser = JSONSchemaFaker.generate(schema, refs) as CreateUser;
		// @ts-ignore
		const returnCreateUser = { ...fakeCreateUser, ...specifiedPropertiesForCreateUser };
		return returnCreateUser;
	}

	export function fakeCreateUsers(...createCreateUser: object[]) : CreateUser[] {
		const returnCreateUsers : CreateUser[] = [];
		createCreateUser.forEach(element => {
			returnCreateUsers.push(fakeCreateUser(element));
		});
		return returnCreateUsers;
	}
	