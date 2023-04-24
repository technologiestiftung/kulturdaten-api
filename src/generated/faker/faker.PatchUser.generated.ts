
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { PatchUser, schemaForPatchUser } from "../models/PatchUser.generated";


	export function fakePatchUser(specifiedPropertiesForPatchUser: object = {}): PatchUser {
		const schema = schemaForPatchUser as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakePatchUser: PatchUser = JSONSchemaFaker.generate(schema, refs) as PatchUser;
		// @ts-ignore
		const returnPatchUser = { ...fakePatchUser, ...specifiedPropertiesForPatchUser };
		return returnPatchUser;
	}

	export function fakePatchUsers(...createPatchUser: object[]) : PatchUser[] {
		const returnPatchUsers : PatchUser[] = [];
		createPatchUser.forEach(element => {
			returnPatchUsers.push(fakePatchUser(element));
		});
		return returnPatchUsers;
	}
	