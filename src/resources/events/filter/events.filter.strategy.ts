import { Token } from "typedi";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";
import { Event } from '../../../generated/models/Event.generated';


export interface EventFilterStrategy {
	isExecutable(searchEventsRequest:SearchEventsRequest) : boolean;
	executeRequest(searchEventsRequest:SearchEventsRequest, page:number, pageSize:number) : Promise<{events:Event[], page:number, pageSize:number, totalCount:number}>
}

export const EventFilterStrategyToken = new Token<EventFilterStrategy>('events.filter.strategies');