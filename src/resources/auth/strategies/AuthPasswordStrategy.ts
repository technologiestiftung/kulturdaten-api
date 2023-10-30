import * as argon2 from "argon2";
import debug from "debug";
import { Strategy } from "passport";
import * as localStrategy from "passport-local";
import { UsersService } from "../../users/services/UsersService";
import { AuthUser } from "../../../generated/models/AuthUser.generated";

const log: debug.IDebugger = debug("app:auth-passport-strategy");

export class AuthPasswordStrategy {
	static strategy: Strategy;

	static getStrategy(usersService: UsersService): Strategy {
		if (!this.strategy) {
			this.strategy = new localStrategy.Strategy({ usernameField: "email" }, async function verify(
				username,
				password,
				done,
			) {
				try {
					const user = await usersService.getUserByEmailWithPassword(username);
					if (!user) {
						return done(null, false);
					}
					const passwordHash = user.password!;
					if (await argon2.verify(passwordHash, password)) {
						const authUser: AuthUser = {
							identifier: user.identifier,
						};
						return done(null, authUser);
					}
				} catch (err) {
					return done(err);
				}
				return done(null, false);
			});
		}
		return this.strategy;
	}
}
