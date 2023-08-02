import { Response } from "express";
import { Service } from "typedi";
import { DistrictDataService } from "../services/district.data.harvester.service";
import { SuccessResponseBuilder } from "../../../common/responses/response.builders";

@Service()
export class DistrictDataHarvestersController {

	constructor(
		public service: DistrictDataService) { }


	async harvest(res: Response) {
		 const createdItems = await this.service.harvestDistrictData();

		 res.status(200).send(new SuccessResponseBuilder().okResponse({ createdOrganizations: createdItems }).build());
		}

}