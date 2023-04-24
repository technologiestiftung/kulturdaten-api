
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateEvent, schemaForCreateEvent } from "../models/CreateEvent.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForShortText } from '../models/ShortText.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';

	export function fakeCreateEvent(useExamples: boolean, specifiedPropertiesForCreateEvent: object = {}): CreateEvent {
		const schema = schemaForCreateEvent as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForShortText as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeCreateEvent: CreateEvent = JSONSchemaFaker.generate(schema, refs) as CreateEvent;
		// @ts-ignore
		const returnCreateEvent = { ...fakeCreateEvent, ...specifiedPropertiesForCreateEvent };
		return returnCreateEvent;
	}

	export function fakeCreateEvents(useExamples: boolean, ...createCreateEvent: object[]) : CreateEvent[] {
		const returnCreateEvents : CreateEvent[] = [];
		createCreateEvent.forEach(element => {
			returnCreateEvents.push(fakeCreateEvent(useExamples, element));
		});
		return returnCreateEvents;
	}
	