/* eslint-disable */
	/**
	 * This file was automatically generated.
	 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file.
	 * 
	 * =>  @see ./src/schemas/models/Event
	 * 
	 * and run "npm run schema-to-interface" or "npm run generate" to regenerate this file.
	 */

	import { JSONSchemaFaker, Schema } from 'json-schema-faker';
	import { Event, schemaForEvent } from "../models/Event.generated";

	import { schemaForMetadata } from '../models/Metadata.generated';
	import { schemaForSchedule } from '../models/Schedule.generated';
	import { schemaForReference } from '../models/Reference.generated';
	import { schemaForContact } from '../models/Contact.generated';
	import { schemaForAdmission } from '../models/Admission.generated';

	export function fakeEvent(useExamples: boolean, specifiedPropertiesForEvent: object = {}): Event {
		const schema = schemaForEvent as Schema;
		const refs : Schema[] = [
			schemaForMetadata as Schema,
			schemaForSchedule as Schema,
			schemaForReference as Schema,
			schemaForContact as Schema,
			schemaForAdmission as Schema,

		];
		JSONSchemaFaker.option('useExamplesValue', useExamples);
		// @ts-ignore
		const fakeEvent: Event = JSONSchemaFaker.generate(schema, refs) as Event;
		// @ts-ignore
		const returnEvent = { ...fakeEvent, ...specifiedPropertiesForEvent };
		return returnEvent;
	}

	export function fakeEvents(useExamples: boolean, ...createEvent: object[]) : Event[] {
		const returnEvents : Event[] = [];
		createEvent.forEach(element => {
			returnEvents.push(fakeEvent(useExamples, element));
		});
		return returnEvents;
	}
	