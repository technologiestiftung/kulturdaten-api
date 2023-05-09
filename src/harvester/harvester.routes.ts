import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { DistrictDataHarvestersController } from './district.data/controllers/district.data.harvester.controller';


const log: debug.IDebugger = debug('app:harvester-routes');

@Service()
export class HarvesterRoutes {

	constructor(
		public districtDataHarvestersController: DistrictDataHarvestersController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.post(
				'/',
				(req: express.Request, res: express.Response) => {
					this.districtDataHarvestersController.harvest(res);
				});


		return router;
	}
}
