import { Response } from "express";
import { Service } from "typedi";
import { SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { Reference } from "../../../generated/models/Reference.generated";
import { DistrictDataService } from "../services/DistrictDataService";
import { HarvestResponse } from "../../../generated/models/HarvestResponse.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";

@Service()
export class DistrictDataHarvestersController {
	constructor(public service: DistrictDataService) {}

	async harvest(res: Response, calendarIDs: string[], authUser: AuthUser) {
		const harvestResult = await this.service.harvestDistrictData(calendarIDs, authUser);

		res.status(200).send(
			new SuccessResponseBuilder<HarvestResponse>()
				.okResponse({
					createdOrganizations: this.buildRefIDs(harvestResult.createdOrganizations),
					duplicateOrganizations: this.buildRefIDs(harvestResult.duplicateOrganizations),
					createdLocations: this.buildRefIDs(harvestResult.createdLocations),
					duplicateLocations: this.buildRefIDs(harvestResult.duplicateLocations),
					createdEvents: this.buildRefIDs(harvestResult.createdEvents),
					duplicateEvents: this.buildRefIDs(harvestResult.duplicateEvents),
					createdAttractions: this.buildRefIDs(harvestResult.createdAttractions),
					duplicateAttractions: this.buildRefIDs(harvestResult.duplicateAttractions),
				})
				.build(),
		);
	}

	private buildRefIDs(references: { [originObjectID: string]: Reference }): string[] {
		return Object.values(references)
			.filter((ref) => ref.referenceId !== undefined)
			.map((ref) => ref.referenceId as string);
	}
}
