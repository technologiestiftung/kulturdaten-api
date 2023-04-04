import debug from 'debug';
import express, { Router } from 'express';
import passport from 'passport';
import { Service } from 'typedi';
import { AuthController } from './controllers/auth.controller';
import { Auth } from './dtos/auth.generated';


const log: debug.IDebugger = debug('app:auth-routes');

@Service()
export class AuthRoutes {

	constructor(
		public authController: AuthController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.post(
				'/token',
				passport.authenticate('password', { session: false }),
				(req: express.Request, res: express.Response) => {
					this.authController.createAuthToken(req, res);
				})
	
		return router;
	}
}