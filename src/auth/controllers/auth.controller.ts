import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:auth-controller');

// @ts-expect-error
let jwtSecret: string = process.env.JWT_SECRET;

let authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || '1m' ;

@Service()
export class AuthController {

	async createAuthToken(req: express.Request, res: express.Response) {
		console.log(JSON.stringify(req.user));
		
		if (req.user) {
			const token = jwt.sign(req.user, jwtSecret, {
				expiresIn: authTokenExpiresIn,
			});
			return res.status(200).send({ token: token, expiresIn: authTokenExpiresIn })
		} else {
			return res.status(400).send();
		}
	}
}
