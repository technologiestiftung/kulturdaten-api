import { Response } from "express";
import { Service } from "typedi";
import { SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { CoordinatesToLocationsResponse } from "../../../generated/models/CoordinatesToLocationsResponse.generated";
import { CoordinatesToLocationsService } from "../services/CoordinatesToLocationsService";

@Service()
export class CoordinatesToLocationsController {
	constructor(public service: CoordinatesToLocationsService) {}

	async enrichData(res: Response, locationsIDs: string[]) {

		const enrichedLocations = await this.service.enrichData(locationsIDs);

		res.status(200).send(
			new SuccessResponseBuilder<CoordinatesToLocationsResponse>()
				.okResponse({
					enrichedLocations: enrichedLocations,
				})
				.build(),
		);
	}
}
