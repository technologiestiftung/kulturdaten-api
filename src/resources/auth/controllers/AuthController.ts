import debug from "debug";
import express from "express";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { LoginResponse } from "../../../generated/models/LoginResponse.generated";
import { UsersService } from "../../users/services/UsersService";
import { AuthUser } from "../strategies/AuthPasswordStrategy";

const log: debug.IDebugger = debug("app:auth-controller");

const jwtSecret = process.env.JWT_SECRET!;

const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "1m";

@Service()
export class AuthController {
	constructor(public usersService: UsersService) {}

	async login(req: express.Request, res: express.Response) {
		if (req.user) {
			const authUser = req.user as AuthUser;
			const token = jwt.sign(authUser, jwtSecret, {
				expiresIn: authTokenExpiresIn,
			});
			const user = await this.usersService.readById(authUser.identifier);
			if (!user) {
				return res.status(404).send(new ErrorResponseBuilder().notFoundResponse("User not found").build());
			}
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
