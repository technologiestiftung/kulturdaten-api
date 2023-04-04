import debug from 'debug';
import express, { Router } from 'express';
import { body, param } from 'express-validator';
import passport from 'passport';
import { Service } from 'typedi';
import { permit } from '../auth/middleware/auth.middleware';
import { validation } from '../common/middleware/common.validation.middleware';
import { UsersController } from './controllers/users.controller';
import { checkUsers } from './middleware/users.middleware';
import { CreateUser } from './dtos/create.user.dto.generated';
import { PatchUser } from './dtos/patch.user.dto.generated';


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
				(req: express.Request, res: express.Response) => {
					const createUser = req.body as CreateUser;
					this.usersController.createUser(res, createUser);
				});

		router
			.get(
				'/:identifier',
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.usersController.getUserById(res, identifier);
				})
			.delete(
				'/:identifier',
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.usersController.removeUser(res, identifier);
				})
			.patch(
				'/:identifier',
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				permit.onlyAdminCanChancePermissions(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const patchUser = req.body as PatchUser;
					this.usersController.patch(res, identifier, patchUser);
				});
		return router;
	}
}
