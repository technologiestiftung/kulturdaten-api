import debug from 'debug';
import passport from 'passport';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { HealthController } from './controllers/health.controller';


const log: debug.IDebugger = debug('app:health-routes');

@Service()
export class HealthRoutes {

	constructor(
		public healthController: HealthController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				passport.authenticate('authenticated-user', { session: false }),
				(req, res) => {
					this.healthController.checkHealth(req, res);
				})
	
		return router;
	}
}
