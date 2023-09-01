import { Response } from "express";
import { Service } from "typedi";
import { SuccessResponseBuilder } from "../../../common/responses/response.builders";
import { Reference } from "../../../generated/models/Reference.generated";
import { DistrictDataService } from "../services/district.data.harvester.service";

@Service()
export class DistrictDataHarvestersController {
	constructor(public service: DistrictDataService) {}

	async harvest(res: Response, calendarIDs: string[]) {
		const createdItems = await this.service.harvestDistrictData(calendarIDs);

		res.status(200).send(
			new SuccessResponseBuilder()
				.okResponse({
					createdOrganizations: this.buildRefIDs(createdItems.createdOrganizations),
					duplicateOrganizations: this.buildRefIDs(createdItems.duplicateOrganizations),
					createdLocations: this.buildRefIDs(createdItems.createdLocations),
					duplicateLocations: this.buildRefIDs(createdItems.duplicateLocations),
					createdEvents: this.buildRefIDs(createdItems.createdEvents),
					duplicateEvents: this.buildRefIDs(createdItems.duplicateEvents),
					createdAttractions: this.buildRefIDs(createdItems.createdAttractions),
					duplicateAttractions: this.buildRefIDs(createdItems.duplicateAttractions),
				})
				.build()
		);
	}

	private buildRefIDs(references: { [originObjectID: string]: Reference }): string[] {
		return Object.values(references)
			.filter((ref) => ref.referenceId !== undefined)
			.map((ref) => ref.referenceId as string);
	}
}
