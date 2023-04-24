
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ContactPoint, schemaForContactPoint } from "../models/ContactPoint.generated";

	import { schemaForTitle } from '../models/Title.generated';

	export function fakeContactPoint(specifiedPropertiesForContactPoint: object = {}): ContactPoint {
		const schema = schemaForContactPoint as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,

		];
		// @ts-ignore
		const fakeContactPoint: ContactPoint = JSONSchemaFaker.generate(schema, refs) as ContactPoint;
		// @ts-ignore
		const returnContactPoint = { ...fakeContactPoint, ...specifiedPropertiesForContactPoint };
		return returnContactPoint;
	}

	export function fakeContactPoints(...createContactPoint: object[]) : ContactPoint[] {
		const returnContactPoints : ContactPoint[] = [];
		createContactPoint.forEach(element => {
			returnContactPoints.push(fakeContactPoint(element));
		});
		return returnContactPoints;
	}
	