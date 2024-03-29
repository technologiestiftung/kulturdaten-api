import debug from "debug";
import express, { Router } from "express";
import { Service } from "typedi";
import { HealthController } from "./controllers/HealthController";

const log: debug.IDebugger = debug("app:health-routes");

@Service()
export class HealthRoutes {
	constructor(public healthController: HealthController) {}

	static readonly basePath: string = "health";

	public getRouter(): Router {
		const router = express.Router();

		router.get("/", (req, res) => {
			this.healthController.checkHealth(req, res);
		});

		return router;
	}
}
