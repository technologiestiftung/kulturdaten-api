import { Response } from "express";
import { Service } from "typedi";
// import { DistrictDataService } from "../services/district.data.harvester.service";

@Service()
export class DistrictDataHarvestersController {

	constructor() { }


	async harvest(res: Response) {
		// const createdItems = await this.service.harvestDistrictData();

		res = res.status(404).send();
	}

}