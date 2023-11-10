import debug from "debug";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Strategy } from "passport";
import * as bearerStrategy from "passport-http-bearer";
import { IVerifyOptions } from "passport-http-bearer";

const log: debug.IDebugger = debug("app:auth-passport-strategy");

const jwtSecret = process.env.JWT_SECRET!;

export class AuthBearerJWTStrategy {
	static strategy: Strategy;

	static getStrategy(): Strategy {
		if (!this.strategy) {
			this.strategy = new bearerStrategy.Strategy(async function verify(token, done) {
				try {
					const authUser = jwt.verify(token, jwtSecret);
					if (!authUser) {
						return done(null, false);
					}
					return done(null, authUser);
				} catch (err) {
					if (err instanceof TokenExpiredError) {
						const errorOptions: IVerifyOptions = { message: "Your token has expired. Please log in again.", scope: "" };
						return done(null, false, errorOptions);
					} else {
						return done(null, false);
					}
				}
			});
		}
		return this.strategy;
	}
}
