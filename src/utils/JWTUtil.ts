import jwt from 'jsonwebtoken';


export type AuthenticatedUser = {
	exp: number;
	userId: string;
	permissionFlags: string;
};

export type AuthTokens =  {
	authToken: string;
	authTokenExpirationIn: string;
	refreshToken: string;
	refreshTokenExpirationIn: string;
}

export class JWTUtil {

	public createAuthToken(userId: string, permissionFlags: string, jwtSecret: string, tokenExpiration: string = "15m") {
		const token = jwt.sign(
			{ userId: userId, permissionFlags: permissionFlags }, 
			jwtSecret, 
			{ expiresIn: tokenExpiration });

		return token;
	}

	public createRefreshToken(userId: string, refreshSecret: string, refreshTokenExpiration: string = "2d") {
		const refreshToken = jwt.sign(
			{ userId: userId }, 
			refreshSecret, 
			{ expiresIn: refreshTokenExpiration });
		return refreshToken;
	}


	public authenticateUserWithAuthToken(token: string, jwtSecret: string) : AuthenticatedUser {
		return jwt.verify(token, jwtSecret) as AuthenticatedUser;
	}


	public refreshAuthToken(token: string, jwtSecret: string, tokenExpiration: string = "15m") {
		const payload = this.authenticateUserWithAuthToken(token, jwtSecret) as AuthenticatedUser;
		return this.createAuthToken(payload.userId, payload.permissionFlags, jwtSecret, tokenExpiration);
	}


	public createTokens(userId: string, permissionFlags: string, 
						authSecret: string, 
						authTokenExpiration: string = "15m", 
						refreshSecret:string, 
						refreshTokenExpiration: string = "2d") : AuthTokens {
		const authToken = this.createAuthToken(userId,permissionFlags,authSecret,authTokenExpiration);
		const refreshToken = this.createRefreshToken(userId,refreshSecret,refreshTokenExpiration);

		return {
			authToken: authToken,
			authTokenExpirationIn: authTokenExpiration,
			refreshToken: refreshToken,
			refreshTokenExpirationIn: refreshTokenExpiration
		}
	}


	
}