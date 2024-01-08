import { Service } from "typedi";
import {
	OrganizationsServiceGetStrategyToken,
	OrganizationsServiceGetStrategy,
	OrganizationsServiceGetStrategyParameter,
} from "./OrganizationsServiceGetStrategy";

@Service({ id: OrganizationsServiceGetStrategyToken, multiple: true })
export class DefaultOrganizationsServiceGetStrategy implements OrganizationsServiceGetStrategy {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	isExecutable(strategyParameter: OrganizationsServiceGetStrategyParameter): boolean {
		return true;
	}
	execute(strategyParameter: OrganizationsServiceGetStrategyParameter): OrganizationsServiceGetStrategyParameter {
		if (!strategyParameter.authUser || !strategyParameter.authUser.organizationIdentifier) {
			strategyParameter.filter = { status: "organization.published" };
		} else {
			strategyParameter.filter = {
				$or: [
					{ status: "organization.published" },
					{ "metadata.editableBy": strategyParameter.authUser.organizationIdentifier },
				],
			};
		}
		return strategyParameter;
	}
}
