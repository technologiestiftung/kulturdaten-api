import { mock } from "ts-mockito";
import { Event } from "../../../generated/models/Event.generated";
import { EventsRepository } from "../repositories/EventsRepository";
import { EventsService } from "./EventsService";

describe("test intersection and removeDuplicates", () => {
	it(" should return the intersection of two event arrays ", async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
			},
			{
				type: "type.Event",
				identifier: "2",
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
			},
			{
				type: "type.Event",
				identifier: "3",
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.getIntersection(eventsA, eventsB)).toStrictEqual([
			{
				type: "type.Event",
				identifier: "2",
			},
		]);
	});

	it(" should return all events without duplicates", async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
			},
			{
				type: "type.Event",
				identifier: "2",
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
			},
			{
				type: "type.Event",
				identifier: "3",
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.removeDuplicates([...eventsA, ...eventsB])).toStrictEqual([
			{
				type: "type.Event",
				identifier: "1",
			},
			{
				type: "type.Event",
				identifier: "2",
			},
			{
				type: "type.Event",
				identifier: "3",
			},
		]);
	});

	it(' MatchMode "any" should return all events without duplicates', async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
			},
			{
				type: "type.Event",
				identifier: "2",
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
			},
			{
				type: "type.Event",
				identifier: "3",
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.match(eventsA, eventsB, "any")).toStrictEqual([
			{
				type: "type.Event",
				identifier: "1",
			},
			{
				type: "type.Event",
				identifier: "2",
			},
			{
				type: "type.Event",
				identifier: "3",
			},
		]);
	});

	it(' MatchMode "all" should return the intersection of two event arrays ', async () => {
		const eventsA: Event[] = [
			{
				type: "type.Event",
				identifier: "1",
			},
			{
				type: "type.Event",
				identifier: "2",
			},
		];
		const eventsB: Event[] = [
			{
				type: "type.Event",
				identifier: "2",
			},
			{
				type: "type.Event",
				identifier: "3",
			},
		];

		const eventService: EventsService = new EventsService(mock<EventsRepository>());

		expect(eventService.match(eventsA, eventsB, "all")).toStrictEqual([
			{
				type: "type.Event",
				identifier: "2",
			},
		]);
	});
});
