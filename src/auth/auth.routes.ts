import debug from 'debug';
import express, { Router } from 'express';
import passport from 'passport';
import { Service } from 'typedi';
import { AuthController } from './controllers/auth.controller';
import { body } from 'express-validator';
import { validation } from '../common/middleware/common.validation.middleware';


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
				[
					body('email', 'Email is required').isEmail(),
					body('password', 'Password is required').isString()
				],
				validation.checkErrors(),
				passport.authenticate('password', { session: false }),
				(req: express.Request, res: express.Response) => {
					this.authController.createAuthToken(req, res);
				})
	
		return router;
	}
}