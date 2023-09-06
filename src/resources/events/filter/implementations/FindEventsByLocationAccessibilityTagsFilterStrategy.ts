import { Inject, Service } from "typedi";
import { Event } from "../../../../generated/models/Event.generated";
import { Filter } from "../../../../generated/models/Filter.generated";
import { MatchMode } from "../../../../generated/models/MatchMode.generated";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { LocationsRepository } from "../../../locations/repositories/LocationsRepository";
import { EventsRepository } from "../../repositories/EventsRepository";
import { EventFilterStrategy, EventFilterStrategyToken } from "../EventFilterStrategy";

@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByLocationAccessibilityTagsFilterStrategy implements EventFilterStrategy {
	constructor(
		@Inject("EventsRepository") public eventsRepository: EventsRepository,
		@Inject("LocationsRepository") public locationsRepository: LocationsRepository
	) {}

	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const byLocationAccessibilityTags = searchEventsRequest.byLocationAccessibilityTags!;
		const tags = byLocationAccessibilityTags.tags ?? [];
		const matchMode: MatchMode = byLocationAccessibilityTags.matchMode ?? "any";
		const accessibilityFilter = this.getFilterForMatchMode(matchMode, tags);
		const projection = { identifier: 1 };
		const locations = await this.locationsRepository.searchAllLocations(accessibilityFilter, projection);
		const attractionsIdentifiers = locations.map((location) => location.identifier);
		const eventsFilter: Filter = {
			"locations.referenceId": { $in: attractionsIdentifiers },
		};
		const events = await this.eventsRepository.searchAllEvents(eventsFilter);
		return events;
	}

	private getFilterForMatchMode(matchMode: MatchMode, tags: string[]): Filter {
		switch (matchMode) {
			case "all":
				return { accessibility: { $all: tags } };
			case "any":
				return { accessibility: { $in: tags } };
		}
	}

	public isExecutable(searchEventsRequest: SearchEventsRequest): boolean {
		return searchEventsRequest.byLocationAccessibilityTags ? true : false;
	}
}
