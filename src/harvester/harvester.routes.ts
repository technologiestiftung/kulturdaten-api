
import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import passport from 'passport';
import { permit } from '../auth/middleware/auth.middleware';
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
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					this.districtDataHarvestersController.harvest(res);
				});


		return router;
	}
}
