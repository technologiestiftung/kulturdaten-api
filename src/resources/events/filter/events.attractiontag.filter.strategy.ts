import { Inject, Service } from "typedi";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";
import { EventFilterStrategy, EventFilterStrategyToken } from "./events.filter.strategy";
import { EventsRepository } from "../repositories/events.repository";
import { Event } from '../../../generated/models/Event.generated';
import { fakeEvent } from "../../../generated/faker/faker.Event.generated";
import { AttractionsRepository } from "../../attractions/repositories/attractions.repository";
import { Filter } from "../../../generated/models/Filter.generated";



@Service({ id: EventFilterStrategyToken, multiple: true })
export class FindEventsByAttractionTagFilterStrategy implements EventFilterStrategy {

	constructor(@Inject('EventsRepository') public eventsRepository: EventsRepository, @Inject('AttractionsRepository') public attractionsRepository: AttractionsRepository) { }


	async executeRequest(searchEventsRequest: SearchEventsRequest, page: number, pageSize: number): Promise<{ events: Event[]; page: number; pageSize: number; totalCount: number; }> {
		const tags : string[] = searchEventsRequest.findEventsByAttractionTag ? searchEventsRequest.findEventsByAttractionTag.tags ? searchEventsRequest.findEventsByAttractionTag.tags : [] : [];
		const matchMode : string = searchEventsRequest.findEventsByAttractionTag ? searchEventsRequest.findEventsByAttractionTag.matchMode ? searchEventsRequest.findEventsByAttractionTag.matchMode : 'any' : 'any';

		const tagFilter : Filter = matchMode === 'all' ? 
		{
			"tags": {
				$all: tags
			  }
		} :  {
			"tags": {
				$in: tags
			}
		}; 

		const projection = {
			"identifier": 1
		};
		
		const attractions = await this.attractionsRepository.searchAllAttractions(tagFilter, projection);
		const attractionsIdentifiers = attractions.map(attraction => attraction.identifier);
		

		const attractionFilter : Filter = {
			"attractions.referenceId": { $in: attractionsIdentifiers }
		};

		const events = await this.eventsRepository.searchEvents(attractionFilter, page, pageSize);
		const totalCount = await this.eventsRepository.countEvents(attractionFilter);

		return Promise.resolve({events:events, page:page, pageSize:pageSize, totalCount:totalCount});

	}
	
	public isExecutable(searchEventsRequest:SearchEventsRequest) : boolean {
		return searchEventsRequest.findEventsByAttractionTag ? true : false;
	}

}