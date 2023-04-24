
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GeoCoordinates, schemaForGeoCoordinates } from "../models/GeoCoordinates.generated";


	export function fakeGeoCoordinates(specifiedPropertiesForGeoCoordinates: object = {}): GeoCoordinates {
		const schema = schemaForGeoCoordinates as Schema;
		const refs : Schema[] = [

		];
		// @ts-ignore
		const fakeGeoCoordinates: GeoCoordinates = JSONSchemaFaker.generate(schema, refs) as GeoCoordinates;
		// @ts-ignore
		const returnGeoCoordinates = { ...fakeGeoCoordinates, ...specifiedPropertiesForGeoCoordinates };
		return returnGeoCoordinates;
	}

	export function fakeGeoCoordinatess(...createGeoCoordinates: object[]) : GeoCoordinates[] {
		const returnGeoCoordinatess : GeoCoordinates[] = [];
		createGeoCoordinates.forEach(element => {
			returnGeoCoordinatess.push(fakeGeoCoordinates(element));
		});
		return returnGeoCoordinatess;
	}
	