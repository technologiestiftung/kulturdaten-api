import { Token } from "typedi";
import { OrganizationParams } from "../../../../common/parameters/Params";
import { Filter } from "../../../../generated/models/Filter.generated";
import { Projection } from "../../../../generated/models/Projection.generated";
import { Pagination } from "../../../../generated/models/Pagination.generated";
import { AuthUser } from "../../../../generated/models/AuthUser.generated";

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

export interface OrganizationsServiceGetStrategy {
	isExecutable(strategyParameter: OrganizationsServiceGetStrategyParameter): boolean;
	execute(strategyParameter: OrganizationsServiceGetStrategyParameter): OrganizationsServiceGetStrategyParameter;
}

export const OrganizationsServiceGetStrategyToken = new Token<OrganizationsServiceGetStrategy>(
	"organizations.service.strategies",
);

export type OrganizationsServiceGetStrategyParameter = {
	pagination: Pagination;
	params?: OrganizationParams;
	filter?: Filter;
	projection?: Projection;
	authUser?: AuthUser;
};
