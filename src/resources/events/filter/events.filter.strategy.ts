import { Token } from "typedi";
import { Event } from "../../../generated/models/Event.generated";
import { SearchEventsRequest } from "../../../generated/models/SearchEventsRequest.generated";

/**
 * IMPORTANT: When implementing this interface, ensure to import the implementation
 * into the Dependency Injection (DI) container using the following:
 *
 * extend the call
 * `Container.import([<ImplementationName>, <OtherImplementations>]);`
 * in the initDependencyInjection() method in app.ts
 *
 * Failure to do so may result in unresolved dependencies during runtime.
 */

export interface EventFilterStrategy {
	isExecutable(searchEventsRequest: SearchEventsRequest): boolean;
	executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]>;
}

export const EventFilterStrategyToken = new Token<EventFilterStrategy>("events.filter.strategies");
