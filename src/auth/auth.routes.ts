import debug from 'debug';
import express, { Router } from 'express';
import passport from 'passport';
import { Service } from 'typedi';
import { AuthController } from './controllers/auth.controller';


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
				(req, res) => {
					this.authController.createAuthToken(req, res);
				})
	
		return router;
	}
}