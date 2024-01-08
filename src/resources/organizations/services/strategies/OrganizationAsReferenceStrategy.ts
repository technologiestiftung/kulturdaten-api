import { Service } from "typedi";
import {
	OrganizationsServiceGetStrategy,
	OrganizationsServiceGetStrategyParameter,
	OrganizationsServiceGetStrategyToken,
} from "./OrganizationsServiceGetStrategy";

@Service({ id: OrganizationsServiceGetStrategyToken, multiple: true })
export class OrganizationAsReferenceStrategy implements OrganizationsServiceGetStrategy {
	isExecutable(strategyParameter: OrganizationsServiceGetStrategyParameter): boolean {
		return strategyParameter.params?.asReference === "true";
	}
	execute(strategyParameter: OrganizationsServiceGetStrategyParameter): OrganizationsServiceGetStrategyParameter {
		if (strategyParameter.params?.asReference) {
			strategyParameter.projection = {
				...strategyParameter.projection,
				referenceType: { $literal: "type.Organization" },
				referenceId: "$identifier",
				referenceLabel: "$title",
			};
		}
		return strategyParameter;
	}
}
