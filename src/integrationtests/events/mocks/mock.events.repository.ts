
import { CreateEvent } from "../../../generated/models/CreateEvent.generated";
import { Event, schemaForEvent } from "../../../generated/models/Event.generated";
import { PatchEvent } from "../../../generated/models/PatchEvent.generated";
import { EventsRepository } from "../../../events/repositories/events.repository";
import { faker } from '@faker-js/faker';
import { JSONSchemaFaker, Schema } from 'json-schema-faker';
import {Core, schemaForCore} from "../../../generated/models/Core.generated";
import {Title, schemaForTitle} from "../../../generated/models/Title.generated";
import {Text, schemaForText} from "../../../generated/models/Text.generated";
import {ShortText, schemaForShortText} from "../../../generated/models/ShortText.generated";
import {DefinedTerm, schemaForDefinedTerm} from "../../../generated/models/DefinedTerm.generated";
import {Reference, schemaForReference} from "../../../generated/models/Reference.generated";

export class MockEventsRepository implements EventsRepository {


	constructor(public dummyEvents: Event[] = []) { };

	reset() {
		this.dummyEvents = [];
	}

	public fillWithDummyEvents(number: number) {
		this.dummyEvents = dummyEvents(number);
	}

	public addDummyEvent() {
		const d = dummyEvent();
		this.dummyEvents.push(d);
		return d.identifier;
	}

	async addEvent(eventFields: CreateEvent): Promise<string> {
		let id = `IDfor${eventFields.title}`;
		let newEvent: Event = {
			identifier: id,
		}
		this.dummyEvents.push(newEvent);
		return Promise.resolve(id);
	}
	async getEvents(limit: number, page: number): Promise<Event[] | null> {
		return Promise.resolve(this.dummyEvents);
	}
	async getEventByIdentifier(eventId: string): Promise<Event | null> {
		try {
			let event: Event | undefined = this.dummyEvents.find(({ identifier }) => identifier === eventId)
			if (event) {
				return Promise.resolve(event);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}

	}
	async updateEventById(eventId: string, eventFields: PatchEvent): Promise<boolean> {
		if (eventFields) {
			const index = this.dummyEvents.findIndex(({ identifier }) => identifier === eventId);

			if (index !== -1) {
				if (eventFields.title) this.dummyEvents[index].title = eventFields.title;
				if (eventFields.description) this.dummyEvents[index].description = eventFields.description;
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
		}
		return Promise.resolve(false);
	}
	async removeEventById(eventId: string): Promise<boolean> {
		const index = this.dummyEvents.findIndex(({ identifier }) => identifier === eventId);
		if (index >= 0) {
			delete this.dummyEvents[index];
			return true;
		}
		return false;
	}

}


export function dummyEvent(): Event {
	const schema = schemaForEvent as Schema;
	const refs = [
		schemaForCore as Schema,
		schemaForTitle as Schema,
		schemaForReference as Schema,
		schemaForText as Schema,
		schemaForShortText as Schema,
		schemaForDefinedTerm as Schema
	];
	// @ts-ignore
	const fakeEvent : Event = JSONSchemaFaker.generate(schema, refs) as Event;
	fakeEvent.identifier = faker.database.mongodbObjectId();
	fakeEvent.title = {
		de: faker.lorem.word(),
		en: faker.lorem.word()
	}
	return fakeEvent;
}

export function dummyCreateDto(): CreateEvent {
	return {
		title: {
			de: faker.lorem.word(),
			en: faker.lorem.word()
		},
		description: {
			de: faker.company.catchPhrase()
		}
	}
}

export function dummyEvents(number: number): Event[] {
	let events: Event[] = [];
	for (let index = 0; index < number; index++) {
		events.push(dummyEvent());
	}
	return events;
}

