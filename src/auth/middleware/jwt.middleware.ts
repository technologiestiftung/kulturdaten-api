import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Jwt } from '../../common/types/jwt';
import { UsersService } from '../../users/services/users.service';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:jwt-middleware');

// @ts-expect-error
let jwtSecret: string = process.env.JWT_SECRET;

@Service()
export class JwtMiddleware {
	constructor(
		public usersService: UsersService){}

	verifyRefreshBodyField(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.body && req.body.refreshToken) {
			return next();
		} else {
			return res
				.status(400)
				.send({ error: 'Missing required field: refreshToken' });
		}
	}

	validJWTNeeded(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (req.headers['authorization']) {
			try {
				const authorization = req.headers['authorization'].split(' ');
				if (authorization[0] !== 'Bearer') {
					return res.status(401).send();
				} else {
					res.locals.jwt = jwt.verify(
						authorization[1],
						jwtSecret
					) as Jwt;
					next();
				}
			} catch (err) {
				return res.status(403).send();
			}
		} else {
			return res.status(401).send();
		}
	}

	async validRefreshNeeded(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const user: any = await this.usersService.getUserByEmail(res.locals.jwt.email);
		const salt = crypto.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
		const hash = crypto
			.createHmac('sha512', salt)
			.update(res.locals.jwt.userId + jwtSecret)
			.digest('base64');
		if (hash === req.body.refreshToken) {
			req.body = {
				userId: user._id,
				email: user.email,
				permissionFlags: user.permissionFlags,
			};
			return next();
		} else {
			return res.status(400).send({ errors: ['Invalid refresh token'] });
		}
	}



}
