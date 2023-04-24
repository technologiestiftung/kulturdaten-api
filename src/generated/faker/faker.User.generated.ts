
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { User, schemaForUser } from "../models/User.generated";


	export function fakeUser(specifiedPropertiesForUser: object = {}): User {
		const schema = schemaForUser as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeUser: User = JSONSchemaFaker.generate(schema, refs) as User;
		// @ts-ignore
		const returnUser = { ...fakeUser, ...specifiedPropertiesForUser };
		return returnUser;
	}

	export function fakeUsers(...createUser: object[]) : User[] {
		const returnUsers : User[] = [];
		createUser.forEach(element => {
			returnUsers.push(fakeUser(element));
		});
		return returnUsers;
	}
	