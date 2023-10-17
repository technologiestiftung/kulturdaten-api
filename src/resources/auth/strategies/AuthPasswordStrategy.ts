import * as argon2 from "argon2";
import debug from "debug";
import { Strategy } from "passport";
import * as localStrategy from "passport-local";
import { UsersService } from "../../users/services/UsersService";
import { User } from "../../../generated/models/User.generated";

const log: debug.IDebugger = debug("app:auth-passport-strategy");

export type AuthUser = Pick<
	User,
	"identifier" | "email" | "firstName" | "lastName" | "permissionFlags" | "memberships"
>;

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
							email: user.email,
							firstName: user.firstName,
							lastName: user.lastName,
							permissionFlags: user.permissionFlags,
							memberships: user.memberships,
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
