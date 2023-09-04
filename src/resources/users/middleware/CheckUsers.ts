import debug from "debug";
import express from "express";
import { UsersService } from "../services/UsersService";

const log: debug.IDebugger = debug("app:users-middleware");

export class CheckUsers {
	static eMailIsNotExist =
		(usersService: UsersService) => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
			const email = req.body.email;
			if (await usersService.getUserByEmail(email)) {
				res.status(409).send({
					msg: "email is already in use",
				});
			} else {
				next();
			}
		};
}
