
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Location, schemaForLocation } from "../models/Location.generated";

	import { schemaForCore } from '../models/Core.generated';
	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForGeoCoordinates } from '../models/GeoCoordinates.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForShortText } from '../models/ShortText.generated';

	export function fakeLocation(useExamples: boolean, specifiedPropertiesForLocation: object = {}): Location {
		const schema = schemaForLocation as Schema;
		const refs : Schema[] = [
			schemaForCore as Schema,
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForPostalAddress as Schema,
			schemaForGeoCoordinates as Schema,
			schemaForBorough as Schema,
			schemaForContactPoint as Schema,
			schemaForReference as Schema,
			schemaForDefinedTerm as Schema,
			schemaForShortText as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeLocation: Location = JSONSchemaFaker.generate(schema, refs) as Location;
		// @ts-ignore
		const returnLocation = { ...fakeLocation, ...specifiedPropertiesForLocation };
		return returnLocation;
	}

	export function fakeLocations(useExamples: boolean, ...createLocation: object[]) : Location[] {
		const returnLocations : Location[] = [];
		createLocation.forEach(element => {
			returnLocations.push(fakeLocation(useExamples, element));
		});
		return returnLocations;
	}
	