import { Inject, Service } from "typedi";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { EventFilterStrategy, EventFilterStrategyToken } from "../events.filter.strategy";
import { EventsRepository } from "../../repositories/events.repository";
import { Event } from '../../../../generated/models/Event.generated';



@Service({ id: EventFilterStrategyToken, multiple: true })
export class MongoDBFilterStrategy implements EventFilterStrategy {

	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository) { }
	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const filter = searchEventsRequest.searchFilter ? searchEventsRequest.searchFilter : {};
		
		let events : Event[] = await this.eventsRepository.searchAllEvents(filter);
		const totalCount = await this.eventsRepository.countEvents(filter);

		return events;
	}
	
	public isExecutable(searchEventsRequest:SearchEventsRequest) : boolean {
		return searchEventsRequest.searchFilter ? true : false;
	}

}