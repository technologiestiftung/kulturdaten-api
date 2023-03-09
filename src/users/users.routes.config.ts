import { CommonRoutesConfig } from '../common/common.routes.config';
import { UsersController } from './controllers/users.controller';
import { UsersMiddleware } from './middleware/users.middleware';
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';
import { CommonPermissionMiddleware } from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import express from 'express';
import { Service } from 'typedi';

@Service()
export class UsersRoutes extends CommonRoutesConfig {
	constructor(
		public usersController: UsersController, 
		public jwtMiddleware: JwtMiddleware,
		public usersMiddleware: UsersMiddleware,
		public permissionMiddleware: CommonPermissionMiddleware) {
		super('UsersRoutes');
	}

	configureRoutes(app: express.Application, preRoute: string): express.Application {
		app.route(`${preRoute}/v1/users`)
			.get(
				(req, res, next) => this.jwtMiddleware.validJWTNeeded(req,res,next),
				(req, res, next) => this.permissionMiddleware.permissionFlagRequired(req, res, next,
					PermissionFlag.ADMIN_PERMISSION
				),
				(req, res, next) => this.usersController.listUsers(req,res)
			)
			.post(
				(req, res, next) => this.usersMiddleware.validateRequiredUserBodyFields(req,res,next), 
				(req, res, next) => this.usersMiddleware.validateSameEmailDoesntExist(req,res,next), 
				(req, res, next) => this.usersController.createUser(req,res)
			);
			
		app.param(`userId`, (req, res, next) => this.usersMiddleware.extractUserId(req, res, next));

		// #TODO: Routen korrekt?
		app.route(`${preRoute}/v1/users/:userId`)
			.all(
				(req, res, next) => this.jwtMiddleware.validJWTNeeded(req,res,next),
				(req, res, next) => this.permissionMiddleware.onlySameUserOrAdminCanDoThisAction(req,res,next),
				(req, res, next) => this.usersMiddleware.validateUserExists(req,res,next),
			)
			.get(
				(req, res, next) => this.usersController.getUserById(req,res)
			)
			.delete(
				(req, res, next) => this.usersController.removeUser(req,res)
			);

		app.route(`${preRoute}/v1/users/:userId`)
			.all(
				(req, res, next) => this.permissionMiddleware.onlySameUserOrAdminCanDoThisAction(req,res,next),
				(req, res, next) => this.usersMiddleware.userCantChangePermission(req,res,next),
				(req, res, next) => this.usersMiddleware.validateSameEmailDoesntExist(req,res,next),
				)
			.put(
				(req, res, next) => this.usersMiddleware.validateRequiredUserBodyFields(req,res,next),
				(req, res, next) => this.usersController.put(req,res)
			)
			.patch(
				(req, res, next) => this.usersController.patch(req,res)
			)
			
		return app;
	}
}