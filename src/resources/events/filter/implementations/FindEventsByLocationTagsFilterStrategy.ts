import { Inject, Service } from "typedi";
import { Event } from "../../../../generated/models/Event.generated";
import { Filter } from "../../../../generated/models/Filter.generated";
import { MatchMode } from "../../../../generated/models/MatchMode.generated";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { LocationsRepository } from "../../../locations/repositories/LocationsRepository";
import { EventsRepository } from "../../repositories/EventsRepository";
import { EventFilterStrategy, EventFilterStrategyToken } from "../EventFilterStrategy";

@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByLocationTagsFilterStrategy implements EventFilterStrategy {
	constructor(
		@Inject("EventsRepository") public eventsRepository: EventsRepository,
		@Inject("LocationsRepository") public locationsRepository: LocationsRepository
	) {}

	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const byLocationTags = searchEventsRequest.byLocationTags!;
		const tags = byLocationTags.tags ?? [];
		const matchMode: MatchMode = byLocationTags.matchMode ?? "any";
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
				return { tags: { $all: tags } };
			case "any":
				return { tags: { $in: tags } };
		}
	}

	public isExecutable(searchEventsRequest: SearchEventsRequest): boolean {
		return searchEventsRequest.byLocationTags ? true : false;
	}
}
