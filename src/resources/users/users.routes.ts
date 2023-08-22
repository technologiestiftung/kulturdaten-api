import debug from 'debug';
import express, { Router } from 'express';
import passport from 'passport';
import { Service } from 'typedi';
import { permit } from '../auth/middleware/auth.middleware';
import { UsersController } from './controllers/users.controller';
import { checkUsers } from './middleware/users.middleware';
import { CreateUserRequest } from '../../generated/models/CreateUserRequest.generated';
import { UpdateUserRequest } from '../../generated/models/UpdateUserRequest.generated';
import { UsersService } from './services/users.service';
import { UpdateUserPasswordRequest } from '../../generated/models/UpdateUserPasswordRequest.generated';
import { getPagination } from '../../utils/RequestUtil';


const log: debug.IDebugger = debug('app:users-routes');

@Service()
export class UsersRoutes {

	constructor(
		public usersController: UsersController, public usersService : UsersService) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				passport.authenticate('authenticated-user', { session: false }),
				permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const { page, pageSize} = getPagination(req);

					this.usersController.listUsers(res, page, pageSize);
				})
			.post(
				'/',
				checkUsers.eMailIsNotExist(this.usersService),
				(req: express.Request, res: express.Response) => {
					const createUser = req.body as CreateUserRequest;
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
					const patchUser = req.body as UpdateUserRequest;
					this.usersController.patch(res, identifier, patchUser);
				});

		router
			.patch('/:identifier/updatePassword', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const updatePasswordRequest = req.body as UpdateUserPasswordRequest;
				this.usersController.updateUserPassword(res, identifier, updatePasswordRequest);
			});

				  
		return router;
	}
}
