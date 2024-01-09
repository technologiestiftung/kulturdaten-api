import { Response } from "express";
import { Service } from "typedi";
import { SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { CoordinatesToLocationsResponse } from "../../../generated/models/CoordinatesToLocationsResponse.generated";
import { CoordinatesToLocationsService } from "../services/CoordinatesToLocationsService";

@Service()
export class CoordinatesToLocationsController {
	constructor(public service: CoordinatesToLocationsService) {}

	async enrichData(res: Response, locationsIDs: string[]) {
		res.status(200).send(
			new SuccessResponseBuilder<CoordinatesToLocationsResponse>()
				.okResponse({
					enrichedLocations: locationsIDs,
				})
				.build(),
		);
	}
}
