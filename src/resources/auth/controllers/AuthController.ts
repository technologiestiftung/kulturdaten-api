import debug from "debug";
import express from "express";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { LoginResponse } from "../../../generated/models/LoginResponse.generated";
import { User } from "../../../generated/models/User.generated";
import { UsersService } from "../../users/services/UsersService";

const log: debug.IDebugger = debug("app:auth-controller");

const jwtSecret = process.env.JWT_SECRET!;

const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "1m";

@Service()
export class AuthController {
	constructor(public usersService: UsersService) {}

	async createAuthToken(req: express.Request, res: express.Response) {
		if (req.user) {
			const requestUser = req.user as User;
			const email = requestUser.email;
			const user = await this.usersService.getUserByEmail(email);
			if (!user) {
				return res.status(404).send(new ErrorResponseBuilder().notFoundResponse("User not found").build());
			}
			const token = jwt.sign(req.user, jwtSecret, {
				expiresIn: authTokenExpiresIn,
			});
			return res.status(200).send(
				new SuccessResponseBuilder<LoginResponse>()
					.okResponse({
						accessToken: token,
						expiresIn: authTokenExpiresIn,
						user,
					})
					.build(),
			);
		}
		return res.status(400).send();
	}
}
