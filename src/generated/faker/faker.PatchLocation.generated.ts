
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { PatchLocation, schemaForPatchLocation } from "../models/PatchLocation.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForPostalAddress } from '../models/PostalAddress.generated';
	import { schemaForBorough } from '../models/Borough.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';

	export function fakePatchLocation(useExamples: boolean, specifiedPropertiesForPatchLocation: object = {}): PatchLocation {
		const schema = schemaForPatchLocation as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForPostalAddress as Schema,
			schemaForBorough as Schema,
			schemaForContactPoint as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakePatchLocation: PatchLocation = JSONSchemaFaker.generate(schema, refs) as PatchLocation;
		// @ts-ignore
		const returnPatchLocation = { ...fakePatchLocation, ...specifiedPropertiesForPatchLocation };
		return returnPatchLocation;
	}

	export function fakePatchLocations(useExamples: boolean, ...createPatchLocation: object[]) : PatchLocation[] {
		const returnPatchLocations : PatchLocation[] = [];
		createPatchLocation.forEach(element => {
			returnPatchLocations.push(fakePatchLocation(useExamples, element));
		});
		return returnPatchLocations;
	}
	