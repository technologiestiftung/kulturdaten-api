import { Inject, Service } from "typedi";
import { Event } from "../../../../generated/models/Event.generated";
import { Filter } from "../../../../generated/models/Filter.generated";
import { MatchMode } from "../../../../generated/models/MatchMode.generated";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { AttractionsRepository } from "../../../attractions/repositories/AttractionsRepository";
import { EventsRepository } from "../../repositories/EventsRepository";
import { EventFilterStrategy, EventFilterStrategyToken } from "../EventFilterStrategy";

@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByAttractionTagFilterStrategy implements EventFilterStrategy {
	constructor(
		@Inject("EventsRepository") public eventsRepository: EventsRepository,
		@Inject("AttractionsRepository") public attractionsRepository: AttractionsRepository,
	) {}

	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const tags: string[] = searchEventsRequest.byAttractionTags?.tags ?? [];
		const matchMode: MatchMode = searchEventsRequest.byAttractionTags?.matchMode ?? "any";

		const tagFilter: Filter = this.getFilterForMatchMode(matchMode, tags);

		const projection = { identifier: 1 };

		const attractions = await this.attractionsRepository.searchAllAttractions(tagFilter, projection);
		const attractionsIdentifiers = attractions.map((attraction) => attraction.identifier);

		const attractionFilter: Filter = {
			"attractions.referenceId": { $in: attractionsIdentifiers },
		};

		const events = await this.eventsRepository.searchAllEvents(attractionFilter);

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
		return searchEventsRequest.byAttractionTags ? true : false;
	}
}
