import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:auth-controller');

// @ts-expect-error
let jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;

@Service()
export class AuthController {

	// TODO: Einfach mal aufräumen und die Auth neu... sauber... aufsetzen
	async createJWT(req: express.Request, res: express.Response) {
		try {
			const refreshId = req.body.userId + jwtSecret;
			let randomBytes = crypto.randomBytes(16);
			const salt = crypto.createSecretKey(randomBytes);
			const hash = crypto
				.createHmac('sha512', salt)
				.update(refreshId)
				.digest('base64');
			req.body.refreshKey = salt.export();
			const token = jwt.sign(req.body, jwtSecret, {
				expiresIn: tokenExpirationInSeconds,
			});
			return res
				.status(201)
				.send({ accessToken: token, refreshToken: hash });
		} catch (err) {
			log('createJWT error: %O', err);
			return res.status(500).send();
		}
	}
}
