import debug from 'debug';
import express, { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { Service } from 'typedi';
import { JwtMiddleware } from '../auth/middleware/jwt.middleware';
import { CommonPermissionMiddleware } from '../common/middleware/common.permission.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import { UsersController } from './controllers/users.controller';
import { UsersMiddleware } from './middleware/users.middleware';


const log: debug.IDebugger = debug('app:users-routes');

@Service()
export class UsersRoutes {

	constructor(
		public usersController: UsersController, 
		public jwtMiddleware: JwtMiddleware,
		public usersMiddleware: UsersMiddleware,
		public permissionMiddleware: CommonPermissionMiddleware) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				(req, res, next) => this.jwtMiddleware.validJWTNeeded(req,res,next),
				(req, res, next) => this.permissionMiddleware.permissionFlagRequired(req, res, next,
					PermissionFlag.ADMIN_PERMISSION
				),
				(req, res) => {
					this.usersController.listUsers(req, res);
				})
			.post(
				'/',
				[
					check('email', 'Email is required').notEmpty(),
					check('password', 'Email is required').notEmpty()
				],
				(req: express.Request, res: express.Response, next: express.NextFunction) => 
						this.usersMiddleware.validateRequiredUserBodyFields(req,res,next), 
				(req: express.Request, res: express.Response, next: express.NextFunction) => 
						this.usersMiddleware.validateSameEmailDoesntExist(req,res,next), 
				(req: express.Request, res: express.Response) => {

					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return res.status(400).json({
							errors: errors.array()
						});
					}
					
					this.usersController.createUser(req, res);
				});

		router
			.all('',
				(req: express.Request, res: express.Response, next: express.NextFunction) => 
						this.jwtMiddleware.validJWTNeeded(req,res,next),
				(req: express.Request, res: express.Response, next: express.NextFunction) => 
						this.permissionMiddleware.onlySameUserOrAdminCanDoThisAction(req,res,next),
				(req: express.Request, res: express.Response, next: express.NextFunction) => 
						this.usersMiddleware.validateUserExists(req,res,next),
			)
			.get(
				'/:userId',
				(req: express.Request, res: express.Response) => {
					this.usersController.getUserById(req, res);
				})
			.delete(
				'/:userId',
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
				(req, res) => {
					this.usersController.patch(req, res);
				});


		return router;
	}
}
