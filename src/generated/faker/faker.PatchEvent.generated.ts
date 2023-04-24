
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { PatchEvent, schemaForPatchEvent } from "../models/PatchEvent.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForShortText } from '../models/ShortText.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';

	export function fakePatchEvent(useExamples: boolean, specifiedPropertiesForPatchEvent: object = {}): PatchEvent {
		const schema = schemaForPatchEvent as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForShortText as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakePatchEvent: PatchEvent = JSONSchemaFaker.generate(schema, refs) as PatchEvent;
		// @ts-ignore
		const returnPatchEvent = { ...fakePatchEvent, ...specifiedPropertiesForPatchEvent };
		return returnPatchEvent;
	}

	export function fakePatchEvents(useExamples: boolean, ...createPatchEvent: object[]) : PatchEvent[] {
		const returnPatchEvents : PatchEvent[] = [];
		createPatchEvent.forEach(element => {
			returnPatchEvents.push(fakePatchEvent(useExamples, element));
		});
		return returnPatchEvents;
	}
	