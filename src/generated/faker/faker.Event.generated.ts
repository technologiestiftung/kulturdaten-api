
	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Event, schemaForEvent } from "../models/Event.generated";

	import { schemaForCore } from '../models/Core.generated';
	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForShortText } from '../models/ShortText.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';

	export function fakeEvent(specifiedPropertiesForEvent: object = {}): Event {
		const schema = schemaForEvent as Schema;
		const refs : Schema[] = [
			schemaForCore as Schema,
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForShortText as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,

		];
		// @ts-ignore
		const fakeEvent: Event = JSONSchemaFaker.generate(schema, refs) as Event;
		// @ts-ignore
		const returnEvent = { ...fakeEvent, ...specifiedPropertiesForEvent };
		return returnEvent;
	}

	export function fakeEvents(...createEvent: object[]) : Event[] {
		const returnEvents : Event[] = [];
		createEvent.forEach(element => {
			returnEvents.push(fakeEvent(element));
		});
		return returnEvents;
	}
	