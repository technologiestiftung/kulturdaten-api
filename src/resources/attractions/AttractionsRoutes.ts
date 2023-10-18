import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Pagination } from "../../common/parameters/Pagination";
import { AddExternalLinkRequest } from "../../generated/models/AddExternalLinkRequest.generated";
import { CreateAttractionRequest } from "../../generated/models/CreateAttractionRequest.generated";
import { RemoveExternalLinkRequest } from "../../generated/models/RemoveExternalLinkRequest.generated";
import { SearchAttractionsRequest } from "../../generated/models/SearchAttractionsRequest.generated";
import { UpdateAttractionRequest } from "../../generated/models/UpdateAttractionRequest.generated";
import { getPagination } from "../../utils/RequestUtil";
import { AttractionsController } from "./controllers/AttractionsController";
import { Permit } from "../auth/middleware/Permit";

const log: debug.IDebugger = debug("app:attractions-routes");

@Service()
export class AttractionsRoutes {
	constructor(public attractionsController: AttractionsController) {}

	public getRouter(): Router {
		const router = express.Router();

		router
			.get("/", (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference;
				const pagination: Pagination = getPagination(req);

				if (asReference) {
					this.attractionsController.listAttractionsAsReference(res, pagination);
				} else {
					this.attractionsController.listAttractions(res, pagination);
				}
			})
			.post(
				"/",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const createAttractionRequest = req.body as CreateAttractionRequest;
					this.attractionsController.createAttraction(res, createAttractionRequest);
				},
			);

		router.post(
			"/bulk-create",
			passport.authenticate("authenticated-user", { session: false }),
			(req: express.Request, res: express.Response) => {
				const createAttractionRequest = req.body as CreateAttractionRequest[];

				this.attractionsController.createAttractions(res, createAttractionRequest);
			},
		);

		router.post("/search", (req: express.Request, res: express.Response) => {
			const pagination: Pagination = getPagination(req);

			const searchAttractionsRequest = req.body as SearchAttractionsRequest;
			this.attractionsController.searchAttractions(res, searchAttractionsRequest, pagination);
		});

		router
			.get("/:identifier", (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if (asReference) {
					this.attractionsController.getAttractionReferenceById(res, identifier);
				} else {
					this.attractionsController.getAttractionById(res, identifier);
				}
			})
			.patch(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction("PATCH:/attractions/"),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const updateAttractionRequest = req.body as UpdateAttractionRequest;
					this.attractionsController.updateAttraction(res, identifier, updateAttractionRequest);
				},
			);

		router
			.post(
				"/:identifier/externallinks",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const addExternalLinkRequest = req.body as AddExternalLinkRequest;
					this.attractionsController.addExternalLink(res, identifier, addExternalLinkRequest);
				},
			)
			.delete(
				"/:identifier/externallinks",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const removeExternalLinkRequest = req.body as RemoveExternalLinkRequest;
					this.attractionsController.removeExternalLink(res, identifier, removeExternalLinkRequest);
				},
			);

		router
			.post(
				"/:identifier/archive",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.archiveAttraction(res, identifier);
				},
			)
			.post(
				"/:identifier/unarchive",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.unarchiveAttraction(res, identifier);
				},
			)
			.post(
				"/:identifier/publish",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.publishAttraction(res, identifier);
				},
			)
			.post(
				"/:identifier/unpublish",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.unpublishAttraction(res, identifier);
				},
			);

		return router;
	}
}
