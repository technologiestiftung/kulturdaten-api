import debug from 'debug';
import express, { Router } from 'express';
import { body, param } from 'express-validator';
import passport from 'passport';
import { Service } from 'typedi';
import { permit } from '../auth/middleware/auth.middleware';
import { validation } from '../common/middleware/common.validation.middleware';
import { UsersController } from './controllers/users.controller';
import { checkUsers } from './middleware/users.middleware';


const log: debug.IDebugger = debug('app:users-routes');

@Service()
export class UsersRoutes {

	constructor(
		public usersController: UsersController) { }

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
					// TODO: strong password? -> usability vs. security
					body('password', 'Password is required').isLength({ min: 5 })
				],
				validation.checkErrors(),
				(req: express.Request, res: express.Response) => {
					this.usersController.createUser(req, res);
				});

		router
			.get(
				'/:userId',
				[
					param('userId', 'User ID is required').isString().notEmpty()
				],
				validation.checkErrors(),
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					this.usersController.getUserById(req, res);
				})
			.delete(
				'/:userId',
				[
					param('userId', 'User ID is required').isString().notEmpty()
				],
				validation.checkErrors(),
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					this.usersController.removeUser(req, res);
				})
			.patch(
				'/:userId',
				[
					param('userId', 'User ID is required').isString().notEmpty(),
					body('email').isEmail().optional(),
					// TODO: strong password? -> usability vs. security
					body('password', 'Password is required').isLength({ min: 5 }).optional(),
					body('firstName').isString().optional(),
					body('lastName').isString().optional(),
					body('permissionFlags').isNumeric().optional(),
				],
				validation.checkErrors(),
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				permit.onlyAdminCanChancePermissions(),
				(req: express.Request, res: express.Response) => {
					this.usersController.patch(req, res);
				});
		return router;
	}
}
