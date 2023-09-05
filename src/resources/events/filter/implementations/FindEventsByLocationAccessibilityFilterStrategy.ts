import { Inject, Service } from "typedi";
import { Event } from "../../../../generated/models/Event.generated";
import { Filter } from "../../../../generated/models/Filter.generated";
import { MatchMode } from "../../../../generated/models/MatchMode.generated";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { LocationsRepository } from "../../../locations/repositories/LocationsRepository";
import { EventsRepository } from "../../repositories/EventsRepository";
import { EventFilterStrategy, EventFilterStrategyToken } from "../EventFilterStrategy";

@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByLocationAccessibilityFilterStrategy implements EventFilterStrategy {
	constructor(
		@Inject("EventsRepository") public eventsRepository: EventsRepository,
		@Inject("LocationsRepository") public locationsRepository: LocationsRepository
	) {}

	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const byLocationAccessibility = searchEventsRequest.byLocationAccessibility!;
		const accessibility = byLocationAccessibility.accessibility ?? [];
		const matchMode: MatchMode = byLocationAccessibility.matchMode ?? "any";
		const accessibilityFilter = this.getFilterForMatchMode(matchMode, accessibility);
		const projection = { identifier: 1 };
		const attractions = await this.locationsRepository.searchAllLocations(accessibilityFilter, projection);
		const attractionsIdentifiers = attractions.map((attraction) => attraction.identifier);
		const eventsFilter: Filter = {
			"attractions.referenceId": { $in: attractionsIdentifiers },
		};
		const events = await this.eventsRepository.searchAllEvents(eventsFilter);
		return events;
	}

	private getFilterForMatchMode(matchMode: MatchMode, accessibility: string[]): Filter {
		switch (matchMode) {
			case "all":
				return { accessibility: { $all: accessibility } };
			case "any":
				return { accessibility: { $in: accessibility } };
		}
	}

	public isExecutable(searchEventsRequest: SearchEventsRequest): boolean {
		return searchEventsRequest.byLocationAccessibility ? true : false;
	}
}
