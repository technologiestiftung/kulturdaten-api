
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { ImageObject, schemaForImageObject } from "../models/ImageObject.generated";

	import { schemaForCore } from '../models/Core.generated';
	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';

	export function fakeImageObject(specifiedPropertiesForImageObject: object = {}): ImageObject {
		const schema = schemaForImageObject as Schema;
		const refs : Schema[] = [
			schemaForCore as Schema,
			schemaForTitle as Schema,
			schemaForText as Schema,

		];
		// @ts-ignore
		const fakeImageObject: ImageObject = JSONSchemaFaker.generate(schema, refs) as ImageObject;
		// @ts-ignore
		const returnImageObject = { ...fakeImageObject, ...specifiedPropertiesForImageObject };
		return returnImageObject;
	}

	export function fakeImageObjects(...createImageObject: object[]) : ImageObject[] {
		const returnImageObjects : ImageObject[] = [];
		createImageObject.forEach(element => {
			returnImageObjects.push(fakeImageObject(element));
		});
		return returnImageObjects;
	}
	