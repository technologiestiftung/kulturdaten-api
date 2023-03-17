import express from 'express';
import debug from 'debug';
import { UsersService } from '../../users/services/users.service';
import * as argon2 from 'argon2';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:auth-middleware');

@Service()
export class AuthMiddleware {

	constructor(public usersService: UsersService){}

	async verifyUserPassword(req: express.Request,res: express.Response,next: express.NextFunction) {
		const user: any = await this.usersService.getUserByEmailWithPassword(req.body.email);
		if (user) {
			const passwordHash = user.password;
			if (await argon2.verify(passwordHash, req.body.password)) {
				req.body = {
					userId: user._id,
					email: user.email,
					permissionFlags: user.permissionFlags,
				};
				return next(); 
			}
		}
		res.status(400).send({ error: 'Invalid email and/or password' });
	}
}
