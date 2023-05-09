/* eslint-disable */
	/**
	 * This file was automatically generated by json-schema-to-typescript.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/CreateEvent
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { CreateEvent, schemaForCreateEvent } from "../models/CreateEvent.generated";

	import { schemaForTitle } from '../models/Title.generated';
	import { schemaForText } from '../models/Text.generated';
	import { schemaForShortText } from '../models/ShortText.generated';
	import { schemaForDefinedTerm } from '../models/DefinedTerm.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContactPoint } from '../models/ContactPoint.generated';
	import { schemaForEventDate } from '../models/EventDate.generated';
	import { schemaForOrigin } from '../models/Origin.generated';

	export function fakeCreateEvent(useExamples: boolean, specifiedPropertiesForCreateEvent: object = {}): CreateEvent {
		const schema = schemaForCreateEvent as Schema;
		const refs : Schema[] = [
			schemaForTitle as Schema,
			schemaForText as Schema,
			schemaForShortText as Schema,
			schemaForDefinedTerm as Schema,
			schemaForReference as Schema,
			schemaForContactPoint as Schema,
			schemaForEventDate as Schema,
			schemaForOrigin as Schema,

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
	