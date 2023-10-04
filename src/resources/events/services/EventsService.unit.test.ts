import { mock } from "ts-mockito";
import { Event } from "../../../generated/models/Event.generated";
import { EventsRepository } from "../repositories/EventsRepository";
import { EventsService } from "./EventsService";
import { Metadata } from "../../../generated/models/Metadata.generated";

const fakeMetadata: Metadata = {
	created: "2023-10-02T15:33:41.146Z",
	updated: "2023-10-02T15:33:41.146Z",
};

describe("test intersection and removeDuplicates", () => {
	it(" should return the intersection of two event arrays ", async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "3",
				metadata: fakeMetadata,
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.getIntersection(eventsA, eventsB)).toStrictEqual([
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
		]);
	});

	it(" should return all events without duplicates", async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "3",
				metadata: fakeMetadata,
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.removeDuplicates([...eventsA, ...eventsB])).toStrictEqual([
			{
				type: "type.Event",
				identifier: "1",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "3",
				metadata: fakeMetadata,
			},
		]);
	});

	it(' MatchMode "any" should return all events without duplicates', async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "3",
				metadata: fakeMetadata,
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.match(eventsA, eventsB, "any")).toStrictEqual([
			{
				type: "type.Event",
				identifier: "1",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "3",
				metadata: fakeMetadata,
			},
		]);
	});

	it(' MatchMode "all" should return the intersection of two event arrays ', async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
			{
				type: "type.Event",
				identifier: "3",
				metadata: fakeMetadata,
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.match(eventsA, eventsB, "all")).toStrictEqual([
			{
				type: "type.Event",
				identifier: "2",
				metadata: fakeMetadata,
			},
		]);
	});
});
