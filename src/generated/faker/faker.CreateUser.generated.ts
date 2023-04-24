
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateUser, schemaForCreateUser } from "../models/CreateUser.generated";


	export function fakeCreateUser(useExamples: boolean, specifiedPropertiesForCreateUser: object = {}): CreateUser {
		const schema = schemaForCreateUser as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateUser: CreateUser = JSONSchemaFaker.generate(schema, refs) as CreateUser;
		// @ts-ignore
		const returnCreateUser = { ...fakeCreateUser, ...specifiedPropertiesForCreateUser };
		return returnCreateUser;
	}

	export function fakeCreateUsers(useExamples: boolean, ...createCreateUser: object[]) : CreateUser[] {
		const returnCreateUsers : CreateUser[] = [];
		createCreateUser.forEach(element => {
			returnCreateUsers.push(fakeCreateUser(useExamples, element));
		});
		return returnCreateUsers;
	}
	