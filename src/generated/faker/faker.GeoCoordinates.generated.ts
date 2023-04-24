
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { GeoCoordinates, schemaForGeoCoordinates } from "../models/GeoCoordinates.generated";


	export function fakeGeoCoordinates(useExamples: boolean, specifiedPropertiesForGeoCoordinates: object = {}): GeoCoordinates {
		const schema = schemaForGeoCoordinates as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeGeoCoordinates: GeoCoordinates = JSONSchemaFaker.generate(schema, refs) as GeoCoordinates;
		// @ts-ignore
		const returnGeoCoordinates = { ...fakeGeoCoordinates, ...specifiedPropertiesForGeoCoordinates };
		return returnGeoCoordinates;
	}

	export function fakeGeoCoordinatess(useExamples: boolean, ...createGeoCoordinates: object[]) : GeoCoordinates[] {
		const returnGeoCoordinatess : GeoCoordinates[] = [];
		createGeoCoordinates.forEach(element => {
			returnGeoCoordinatess.push(fakeGeoCoordinates(useExamples, element));
		});
		return returnGeoCoordinatess;
	}
	