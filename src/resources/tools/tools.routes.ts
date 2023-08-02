import debug from 'debug';
import express, { Router } from 'express';
import passport from 'passport';
import { Service } from 'typedi';
import { ToolsController } from './controllers/tools.controller';
import { GenerateEventsRequest } from '../../generated/models/GenerateEventsRequest.generated';


const log: debug.IDebugger = debug('app:tools-routes');

@Service()
export class AuthRoutes {

	constructor(
		public toolsController: ToolsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.post(
				'/eventGeneration',
				passport.authenticate('password', { session: false }),
				(req: express.Request, res: express.Response) => {
					const generateEventsRequest = req.body as GenerateEventsRequest;
					this.toolsController.generateEventsAndAttraction(res, generateEventsRequest);
				})
	
		return router;
	}
}