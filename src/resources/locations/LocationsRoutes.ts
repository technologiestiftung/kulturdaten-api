import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Pagination } from "../../common/parameters/Pagination";
import { ClaimLocationRequest } from "../../generated/models/ClaimLocationRequest.generated";
import { SearchLocationsRequest } from "../../generated/models/SearchLocationsRequest.generated";
import { SetLocationManagerRequest } from "../../generated/models/SetLocationManagerRequest.generated";
import { UpdateLocationRequest } from "../../generated/models/UpdateLocationRequest.generated";
import { extractArrayQueryParam, getPagination } from "../../utils/RequestUtil";
import { LocationsController } from "./controllers/LocationsController";
import { Permit } from "../auth/middleware/Permit";
import { AuthUser } from "../../generated/models/AuthUser.generated";
import { CreateLocationRequest } from "../../generated/models/CreateLocationRequest.generated";
import { LocationParams } from "../../common/parameters/Params";

const log: debug.IDebugger = debug("app:locations-routes");

@Service()
export class LocationsRoutes {
	constructor(public locationsController: LocationsController) {}

	static readonly basePath: string = "/locations";

	public getRouter(): Router {
		const router = express.Router();

		router
			.get(LocationsRoutes.basePath + "/", (req: express.Request, res: express.Response) => {
				const pagination: Pagination = getPagination(req);
				const anyAccessibilities: string[] | undefined = extractArrayQueryParam(req, "anyAccessibilities");
				const allAccessibilities: string[] | undefined = extractArrayQueryParam(req, "allAccessibilities");
				const params: LocationParams = {
					asReference: req.query.asReference as string,
					managedBy: req.query.managedBy as string,
					editableBy: req.query.editableBy as string,
					anyAccessibilities: anyAccessibilities,
					allAccessibilities: allAccessibilities,
				};

				this.locationsController.listLocations(res, pagination, params);
			})
			.post(
				LocationsRoutes.basePath + "/",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const createLocationRequest = req.body as CreateLocationRequest;
					const authUser = req.user as AuthUser;
					this.locationsController.createLocation(res, createLocationRequest, authUser);
				},
			);

		router.post(
			LocationsRoutes.basePath + "/bulk-create",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			(req: express.Request, res: express.Response) => {
				const createLocationsRequest = req.body as CreateLocationRequest[];
				const authUser = req.user as AuthUser;
				this.locationsController.createLocations(res, createLocationsRequest, authUser);
			},
		);

		router.post(LocationsRoutes.basePath + "/search", (req: express.Request, res: express.Response) => {
			const pagination: Pagination = getPagination(req);

			const searchLocationsRequest = req.body as SearchLocationsRequest;
			this.locationsController.searchLocations(res, searchLocationsRequest, pagination);
		});

		router
			.get(LocationsRoutes.basePath + "/:identifier", (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if (asReference) {
					this.locationsController.getLocationReferenceById(res, identifier);
				} else {
					this.locationsController.getLocationById(res, identifier);
				}
			})
			.patch(
				LocationsRoutes.basePath + "/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const updateLocationRequest = req.body as UpdateLocationRequest;
					this.locationsController.updateLocation(res, identifier, updateLocationRequest);
				},
			);

		router
			.post(
				LocationsRoutes.basePath + "/:identifier/manager",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const setLocationManagerRequest = req.body as SetLocationManagerRequest;
					this.locationsController.setLocationManager(res, identifier, setLocationManagerRequest);
				},
			)
			.delete(
				LocationsRoutes.basePath + "/:identifier/manager",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.deleteLocationManager(res, identifier);
				},
			);

		router
			.post(
				LocationsRoutes.basePath + "/:identifier/publish",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.publishLocation(res, identifier);
				},
			)
			.post(
				LocationsRoutes.basePath + "/:identifier/unpublish",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.unpublishLocation(res, identifier);
				},
			)
			.post(
				LocationsRoutes.basePath + "/:identifier/open",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.openLocation(res, identifier);
				},
			)
			.post(
				LocationsRoutes.basePath + "/:identifier/close",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.closeLocation(res, identifier);
				},
			)
			.post(
				LocationsRoutes.basePath + "/:identifier/permanentlyClose",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.permanentlyCloseLocation(res, identifier);
				},
			)
			.post(
				LocationsRoutes.basePath + "/:identifier/archive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.archiveLocation(res, identifier);
				},
			)
			.post(
				LocationsRoutes.basePath + "/:identifier/unarchive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				Permit.authorizesToManipulateResource(this.locationsController),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.unarchiveLocation(res, identifier);
				},
			);

		router.post(
			LocationsRoutes.basePath + "/:identifier/claim",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			(req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const claimLocationRequest = req.body as ClaimLocationRequest;
				this.locationsController.claimLocation(res, identifier, claimLocationRequest);
			},
		);

		return router;
	}
}
