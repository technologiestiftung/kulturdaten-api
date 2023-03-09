import express from 'express';
import debug from 'debug';
import { UsersService } from '../services/users.service';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:users-controller');


@Service()
export class UsersMiddleware {

	constructor(
		public usersService: UsersService){}

	async extractUserId(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		req.body.id = req.params.userId;
		next();
	}

	async validateRequiredUserBodyFields(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.body && req.body.email && req.body.password) {
			next();
		} else {
			res.status(400).send({
				error: `Missing required fields email and password`,
			});
		}
	}
	
	async validateSameEmailDoesntExist(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const user = await this.usersService.getUserByEmail(req.body.email);
		if (user) {
			res.status(400).send({ error: `User email already exists` });
		} else {
			next();
		}
	}
	
	
	async validateUserExists(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const user = await this.usersService.readById(req.params.userId);
		if (user) {
			res.locals.user = user;
			next();
		} else {
			res.status(404).send({
				error: `User ${req.params.userId} not found`,
			});
		}
	}

	async userCantChangePermission(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (
			'permissionFlags' in req.body &&
			req.body.permissionFlags !== res.locals.user.permissionFlags
		) {
			res.status(400).send({
				error:  'User cannot change permission flags'
			});
		} else {
			next();
		}
	}

}
