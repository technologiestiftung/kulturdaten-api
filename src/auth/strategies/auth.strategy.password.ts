import debug from 'debug';
import { UsersService } from '../../users/services/users.service';
import * as argon2 from 'argon2';
import { Strategy } from 'passport';
import * as localStrategy from 'passport-local';

const log: debug.IDebugger = debug('app:auth-passport-strategy');


export class AuthPassword {

	static strategy: Strategy;

	static getStrategy(usersService: UsersService): Strategy {
		if (!this.strategy) {
			this.strategy = new localStrategy.Strategy({usernameField: 'email'},async function verify(username, password, done) {
				try {
					console.log("Strategie wird ausgeführt.");
					
					const user: any = await usersService.getUserByEmailWithPassword(username);
					if (!user) { return done(null, false) }
					const passwordHash = user.password;
					if (await argon2.verify(passwordHash, password)) {
						return done(null, {
							id: user.id,
							email: user.email,
							permissionFlags: user.permissionFlags
						});
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
