/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CommandLocationEditProfile
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CommandLocationEditProfile, schemaForCommandLocationEditProfile } from "../models/CommandLocationEditProfile.generated";

	import { schemaForLocationProfile } from '../models/LocationProfile.generated';

	export function fakeCommandLocationEditProfile(useExamples: boolean, specifiedPropertiesForCommandLocationEditProfile: object = {}): CommandLocationEditProfile {
		const schema = schemaForCommandLocationEditProfile as Schema;
		const refs : Schema[] = [
			schemaForLocationProfile as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCommandLocationEditProfile: CommandLocationEditProfile = JSONSchemaFaker.generate(schema, refs) as CommandLocationEditProfile;
		// @ts-ignore
		const returnCommandLocationEditProfile = { ...fakeCommandLocationEditProfile, ...specifiedPropertiesForCommandLocationEditProfile };
		return returnCommandLocationEditProfile;
	}

	export function fakeCommandLocationEditProfiles(useExamples: boolean, ...createCommandLocationEditProfile: object[]) : CommandLocationEditProfile[] {
		const returnCommandLocationEditProfiles : CommandLocationEditProfile[] = [];
		createCommandLocationEditProfile.forEach(element => {
			returnCommandLocationEditProfiles.push(fakeCommandLocationEditProfile(useExamples, element));
		});
		return returnCommandLocationEditProfiles;
	}
	