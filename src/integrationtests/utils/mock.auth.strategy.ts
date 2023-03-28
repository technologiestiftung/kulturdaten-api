import passport from "passport";
import * as bearerStrategy from 'passport-http-bearer';

export function mockTokenForExistUser (user = {
	id: "1",
	email: "user@ts.berlin",
	permissionFlags: 1
}, token: string = "EXIST_USER_TOKEN"): string {
	passport.use('authenticated-user', new bearerStrategy.Strategy(async function verify(t, done) {return done(null, user)}));
	return token;
};

export function mockTokenForNotExistUser (user = {
	id: "1",
	email: "user@ts.berlin",
	permissionFlags: 1
}, token: string = "NOT_EXIST_USER_TOKEN"): string {
	passport.use('authenticated-user', new bearerStrategy.Strategy(async function verify(t, done) {return done(null, false)}));
	return token;
};