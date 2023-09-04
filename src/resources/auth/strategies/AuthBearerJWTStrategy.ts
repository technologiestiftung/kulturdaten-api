import debug from "debug";
import jwt from "jsonwebtoken";
import { Strategy } from "passport";
import * as bearerStrategy from "passport-http-bearer";

const log: debug.IDebugger = debug("app:auth-passport-strategy");

// @ts-expect-error
let jwtSecret: string = process.env.JWT_SECRET;

export class AuthBearerJWTStrategy {
	static strategy: Strategy;

	static getStrategy(): Strategy {
		if (!this.strategy) {
			this.strategy = new bearerStrategy.Strategy(async function verify(token, done) {
				try {
					const user = jwt.verify(token, jwtSecret);
					if (!user) {
						return done(null, false);
					}
					return done(null, user);
				} catch (err) {
					return done(null, false);
				}
			});
		}
		return this.strategy;
	}
}
