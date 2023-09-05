import { Inject, Service } from "typedi";
import { Event } from "../../../../generated/models/Event.generated";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { EventsRepository } from "../../repositories/EventsRepository";
import { EventFilterStrategy, EventFilterStrategyToken } from "../EventFilterStrategy";
import { getTodayAsString } from "../../../../utils/DateTimeUtil";

@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindInTheFutureEventsFilterStrategy implements EventFilterStrategy {
	constructor(@Inject("EventsRepository") public eventsRepository: EventsRepository) {}
	public today = getTodayAsString;
	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const filter = searchEventsRequest.inTheFuture
			? {
					"schedule.endDate": {
						$gte: this.today(),
					},
			  }
			: {};
		const events: Event[] = await this.eventsRepository.searchAllEvents(filter);

		return events;
	}

	public isExecutable(searchEventsRequest: SearchEventsRequest): boolean {
		return "inTheFuture" in searchEventsRequest;
	}
}
