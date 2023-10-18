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

	static readonly basePath: string = "/attractions";

	public getRouter(): Router {
		const router = express.Router();

		router
			.get(AttractionsRoutes.basePath + "/", (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference;
				const pagination: Pagination = getPagination(req);

				if (asReference) {
					this.attractionsController.listAttractionsAsReference(res, pagination);
				} else {
					this.attractionsController.listAttractions(res, pagination);
				}
			})
			.post(
				AttractionsRoutes.basePath + "/",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const createAttractionRequest = req.body as CreateAttractionRequest;
					this.attractionsController.createAttraction(res, createAttractionRequest);
				},
			);

		router.post(
			AttractionsRoutes.basePath + "/bulk-create",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			(req: express.Request, res: express.Response) => {
				const createAttractionRequest = req.body as CreateAttractionRequest[];

				this.attractionsController.createAttractions(res, createAttractionRequest);
			},
		);

		router.post(AttractionsRoutes.basePath + "/search", (req: express.Request, res: express.Response) => {
			const pagination: Pagination = getPagination(req);

			const searchAttractionsRequest = req.body as SearchAttractionsRequest;
			this.attractionsController.searchAttractions(res, searchAttractionsRequest, pagination);
		});

		router
			.get(AttractionsRoutes.basePath + "/:identifier", (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if (asReference) {
					this.attractionsController.getAttractionReferenceById(res, identifier);
				} else {
					this.attractionsController.getAttractionById(res, identifier);
				}
			})
			.patch(
				AttractionsRoutes.basePath + "/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const updateAttractionRequest = req.body as UpdateAttractionRequest;
					this.attractionsController.updateAttraction(res, identifier, updateAttractionRequest);
				},
			);

		router
			.post(
				AttractionsRoutes.basePath + "/:identifier/externallinks",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const addExternalLinkRequest = req.body as AddExternalLinkRequest;
					this.attractionsController.addExternalLink(res, identifier, addExternalLinkRequest);
				},
			)
			.delete(
				AttractionsRoutes.basePath + "/:identifier/externallinks",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const removeExternalLinkRequest = req.body as RemoveExternalLinkRequest;
					this.attractionsController.removeExternalLink(res, identifier, removeExternalLinkRequest);
				},
			);

		router
			.post(
				AttractionsRoutes.basePath + "/:identifier/archive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.archiveAttraction(res, identifier);
				},
			)
			.post(
				AttractionsRoutes.basePath + "/:identifier/unarchive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.unarchiveAttraction(res, identifier);
				},
			)
			.post(
				AttractionsRoutes.basePath + "/:identifier/publish",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.publishAttraction(res, identifier);
				},
			)
			.post(
				AttractionsRoutes.basePath + "/:identifier/unpublish",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.attractionsController.unpublishAttraction(res, identifier);
				},
			);

		return router;
	}
}
