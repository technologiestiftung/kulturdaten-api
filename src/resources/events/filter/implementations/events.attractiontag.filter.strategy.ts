import { Inject, Service } from "typedi";
import { SearchEventsRequest } from "../../../../generated/models/SearchEventsRequest.generated";
import { EventFilterStrategy, EventFilterStrategyToken } from "../events.filter.strategy";
import { EventsRepository } from "../../repositories/events.repository";
import { Event } from '../../../../generated/models/Event.generated';
import { AttractionsRepository } from "../../../attractions/repositories/attractions.repository";
import { Filter } from "../../../../generated/models/Filter.generated";



@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByAttractionTagFilterStrategy implements EventFilterStrategy {

	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository, @Inject('AttractionsRepository') public attractionsRepository: AttractionsRepository) { }

	async executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]> {
		const tags: string[] = searchEventsRequest.findEventsByAttractionTag?.tags ?? [];
		const matchMode: string = searchEventsRequest.findEventsByAttractionTag?.matchMode ?? 'any';
	  
		const tagFilter: Filter = matchMode === 'all'
		  ? { "tags": { $all: tags } }
		  : { "tags": { $in: tags } };
	  
		const projection = { "identifier": 1 };
	  
		const attractions = await this.attractionsRepository.searchAllAttractions(tagFilter, projection);
		const attractionsIdentifiers = attractions.map(attraction => attraction.identifier);
	  
		const attractionFilter: Filter = {
		  "attractions.referenceId": { $in: attractionsIdentifiers }
		};
	  
		const events = await this.eventsRepository.searchAllEvents(attractionFilter);
	  
		return events;
	  }
	
	public isExecutable(searchEventsRequest:SearchEventsRequest) : boolean {
		return searchEventsRequest.findEventsByAttractionTag ? true : false;
	}

}