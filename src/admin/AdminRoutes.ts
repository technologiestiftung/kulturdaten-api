import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { AttractionsController } from "../resources/attractions/controllers/AttractionsController";
import { Permit } from "../resources/auth/middleware/Permit";
import { getPagination } from "../utils/RequestUtil";
import { DistrictDataHarvestersController } from "./districtData/controllers/DistrictDataHarvestersController";

const log: debug.IDebugger = debug("app:admin-routes");

@Service()
export class AdminRoutes {
	constructor(
		public districtDataHarvestersController: DistrictDataHarvestersController,
		public attractionsController: AttractionsController,
	) {}

	public getRouter(): Router {
		const router = express.Router();

		router
			.post(
				"/harvest/baevents-bezirkskalender",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const calendarIDs = req.body as string[];
					this.districtDataHarvestersController.harvest(res, calendarIDs);
				},
			)
			.post(
				"/data-enrichment/coordinates-to-locations",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const calendarIDs = req.body as string[];
					this.districtDataHarvestersController.harvest(res, calendarIDs);
				},
			);

		router
			.get(
				"/attractions",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const pagination = getPagination(req);
					this.attractionsController.listAttractionsForAdmins(res, pagination);
				},
			)
			.get(
				"/attractions/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.getAttractionByIdForAdmins(res, identifier);
				},
			);

		return router;
	}
}
