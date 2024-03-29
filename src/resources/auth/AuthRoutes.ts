import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { AuthController } from "./controllers/AuthController";

const log: debug.IDebugger = debug("app:auth-routes");

@Service()
export class AuthRoutes {
	constructor(public authController: AuthController) {}

	public getRouter(): Router {
		const router = express.Router();

		router.post(
			"/login",
			passport.authenticate("password", { session: false }),
			(req: express.Request, res: express.Response) => {
				this.authController.login(req, res);
			},
		);

		return router;
	}
}
