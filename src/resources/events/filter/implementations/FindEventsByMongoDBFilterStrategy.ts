import { Inject, Service } from "typedi";
import { Event } from "../../../../generated/models/Event.generated";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { EventsRepository } from "../../repositories/EventsRepository";
import { EventFilterStrategy, EventFilterStrategyToken } from "../EventFilterStrategy";

@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByMongoDBFilterStrategy implements EventFilterStrategy {
	constructor(@Inject("EventsRepository") public eventsRepository: EventsRepository) {}
	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const filter = searchEventsRequest.searchFilter || {};

		const events: Event[] = await this.eventsRepository.searchAllEvents(filter);

		return events;
	}

	public isExecutable(searchEventsRequest: SearchEventsRequest): boolean {
		return searchEventsRequest.searchFilter ? true : false;
	}
}
