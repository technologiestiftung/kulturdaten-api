import { mock } from "ts-mockito";
import { Event } from "../../../generated/models/Event.generated";
import { EventsRepository } from "../repositories/EventsRepository";
import { EventsService } from "./EventsService";
import { describe, it, expect } from "vitest";

function createEvent(identifier: string) {
	const event: Event = {
		identifier,
		type: "type.Event",
		metadata: {
			created: "2023-10-02T15:33:41.146Z",
			updated: "2023-10-02T15:33:41.146Z",
		},
		status: "event.published",
		scheduleStatus: "event.scheduled",
		locations: [],
		attractions: [],
		organizer: {
			referenceType: "type.Organizer",
			referenceId: "asdfgh",
		},
	};
	return event;
}

describe("test intersection and removeDuplicates", () => {
	it(" should return the intersection of two event arrays ", async () => {
		const eventsA = [createEvent("1"), createEvent("2")];
		const eventsB = [createEvent("2"), createEvent("3")];
		const eventService = new EventsService(mock<EventsRepository>());
		expect(eventService.getIntersection(eventsA, eventsB)).toStrictEqual([createEvent("2")]);
	});

	it(" should return all events without duplicates", async () => {
		const eventsA = [createEvent("1"), createEvent("2")];
		const eventsB = [createEvent("2"), createEvent("3")];
		const eventService = new EventsService(mock<EventsRepository>());
		expect(eventService.removeDuplicates([...eventsA, ...eventsB])).toStrictEqual([
			createEvent("1"),
			createEvent("2"),
			createEvent("3"),
		]);
	});

	it(' MatchMode "any" should return all events without duplicates', async () => {
		const eventsA: Event[] = [createEvent("1"), createEvent("2")];
		const eventsB: Event[] = [createEvent("2"), createEvent("3")];
		const eventService = new EventsService(mock<EventsRepository>());
		expect(eventService.match(eventsA, eventsB, "any")).toStrictEqual([
			createEvent("1"),
			createEvent("2"),
			createEvent("3"),
		]);
	});

	it(' MatchMode "all" should return the intersection of two event arrays ', async () => {
		const eventsA: Event[] = [createEvent("1"), createEvent("2")];
		const eventsB: Event[] = [createEvent("2"), createEvent("3")];
		const eventService = new EventsService(mock<EventsRepository>());
		expect(eventService.match(eventsA, eventsB, "all")).toStrictEqual([createEvent("2")]);
	});
});
