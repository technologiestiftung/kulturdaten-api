import { Token } from "typedi";
import { Pagination } from "../../../../generated/models/Pagination.generated";
import { OrganizationParams } from "../../../../common/parameters/Params";

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

export interface GetOrganizationsServiceStrategy {
	isExecutable(pagination: Pagination, params?: OrganizationParams, filter?: Filter, ): boolean;
	executeRequest(searchEventsRequest: SearchEventsRequest): Promise<Event[]>;
}

export const EventFilterStrategyToken = new Token<GetOrganizationsServiceStrategy>("organizations.service.strategies");
