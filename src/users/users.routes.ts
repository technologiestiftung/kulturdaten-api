import debug from 'debug';
import express, { Router } from 'express';
import { body, check, param, validationResult } from 'express-validator';
import passport from 'passport';
import { Service } from 'typedi';
import { permit } from '../auth/middleware/auth.middleware';
import { CommonPermissionMiddleware } from '../common/middleware/common.permission.middleware';
import { validation } from '../common/middleware/common.validation.middleware';
import { UsersController } from './controllers/users.controller';
import { checkUsers, UsersMiddleware } from './middleware/users.middleware';


const log: debug.IDebugger = debug('app:users-routes');

@Service()
export class UsersRoutes {

	// TODO: Refactor auth-middleware
	//	- more middleware for 'same user or admin' etc
	//  - refactor use of middleware and 

	constructor(
		public usersController: UsersController, 
		public usersMiddleware: UsersMiddleware,
		public permissionMiddleware: CommonPermissionMiddleware) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					this.usersController.listUsers(req, res);
				})
			.post(
				'/',
				[
					body('email', 'Email is required').isEmail(),
					body('email').custom(value => checkUsers.eMailIsNotExist(value)),
					body('password', 'Password is required').notEmpty()
				], 
				validation.checkErrors(),
				(req: express.Request, res: express.Response) => {
					this.usersController.createUser(req, res);
				});

		router
			.get(
				'/:userId',
				[
					param('userId', 'User ID is required').notEmpty()
				],
				validation.checkErrors(),
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					this.usersController.getUserById(req, res);
				})
			.delete(
				'/:userId',
				passport.authenticate('authenticated-user', { session: false }),
				(req, res) => {
					this.usersController.removeUser(req, res);
				});

		router
			.all('',
			(req: express.Request, res: express.Response, next: express.NextFunction) => this.permissionMiddleware.onlySameUserOrAdminCanDoThisAction(req,res,next),
			(req: express.Request, res: express.Response, next: express.NextFunction) => this.usersMiddleware.userCantChangePermission(req,res,next),
			(req: express.Request, res: express.Response, next: express.NextFunction) => this.usersMiddleware.validateSameEmailDoesntExist(req,res,next),
			)
			.patch(
				'/:userId',
				passport.authenticate('authenticated-user', { session: false }),
				(req, res) => {
					this.usersController.patch(req, res);
				});


		return router;
	}
}
