import { Response } from "express";
import { Service } from "typedi";
import { DistrictDataService } from "../services/district.data.harvester.service";

@Service()
export class DistrictDataHarvestersController {

	constructor(
		public service: DistrictDataService) { }


	async harvest(res: Response) {
		this.service.harvestDistrictData();

		res = res.status(200).send();
	}

}