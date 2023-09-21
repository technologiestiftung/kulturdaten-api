import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Permit } from "../resources/auth/middleware/Permit";
import { DistrictDataHarvestersController } from "./districtData/controllers/DistrictDataHarvestersController";

const log: debug.IDebugger = debug("app:admin-routes");

@Service()
export class AdminRoutes {
	constructor(public districtDataHarvestersController: DistrictDataHarvestersController) {}

	public getRouter(): Router {
		const router = express.Router();

		router.post(
			"/harvest/baevents-bezirkskalender",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesAsAdmin(),
			(req: express.Request, res: express.Response) => {
				const calendarIDs = req.body as string[];
				this.districtDataHarvestersController.harvest(res, calendarIDs);
			},
		);

		return router;
	}
}
