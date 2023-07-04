/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Coordinates
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Coordinates, schemaForCoordinates } from "../models/Coordinates.generated";


	export function fakeCoordinates(useExamples: boolean, specifiedPropertiesForCoordinates: object = {}): Coordinates {
		const schema = schemaForCoordinates as Schema;
		const refs : Schema[] = [

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCoordinates: Coordinates = JSONSchemaFaker.generate(schema, refs) as Coordinates;
		// @ts-ignore
		const returnCoordinates = { ...fakeCoordinates, ...specifiedPropertiesForCoordinates };
		return returnCoordinates;
	}

	export function fakeCoordinatess(useExamples: boolean, ...createCoordinates: object[]) : Coordinates[] {
		const returnCoordinatess : Coordinates[] = [];
		createCoordinates.forEach(element => {
			returnCoordinatess.push(fakeCoordinates(useExamples, element));
		});
		return returnCoordinatess;
	}
	