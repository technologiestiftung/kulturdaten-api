import { Inject, Service } from "typedi";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";
import { EventFilterStrategy, EventFilterStrategyToken } from "./events.filter.strategy";
import { EventsRepository } from "../repositories/events.repository";
import { Event } from '../../../generated/models/Event.generated';



@Service({ id: EventFilterStrategyToken, multiple: true })
export class MongoDBFilterStrategy implements EventFilterStrategy {

	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository) { }
	async executeRequest(searchEventsRequest: SearchEventsRequest, page: number, pageSize: number): Promise<{ events: Event[]; page: number; pageSize: number; totalCount: number; }> {
		const filter = searchEventsRequest.searchFilter ? searchEventsRequest.searchFilter : {};
		
		let events : Event[] = await this.eventsRepository.searchEvents(filter, page, pageSize);
		const totalCount = await this.eventsRepository.countEvents(filter);

		return Promise.resolve({events:events, page:page, pageSize:pageSize, totalCount:totalCount});
	}
	
	public isExecutable(searchEventsRequest:SearchEventsRequest) : boolean {
		return searchEventsRequest.searchFilter ? true : false;
	}

}