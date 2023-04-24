
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateLocation, schemaForCreateLocation } from "../models/CreateLocation.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';

	export function fakeCreateLocation(specifiedPropertiesForCreateLocation: object = {}): CreateLocation {
		const schema = schemaForCreateLocation as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForPostalAddress as Schema,
			schemaForBorough as Schema,
			schemaForContactPoint as Schema,

		];
		// @ts-ignore
		const fakeCreateLocation: CreateLocation = JSONSchemaFaker.generate(schema, refs) as CreateLocation;
		// @ts-ignore
		const returnCreateLocation = { ...fakeCreateLocation, ...specifiedPropertiesForCreateLocation };
		return returnCreateLocation;
	}

	export function fakeCreateLocations(...createCreateLocation: object[]) : CreateLocation[] {
		const returnCreateLocations : CreateLocation[] = [];
		createCreateLocation.forEach(element => {
			returnCreateLocations.push(fakeCreateLocation(element));
		});
		return returnCreateLocations;
	}
	