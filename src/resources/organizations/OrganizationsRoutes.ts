import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Pagination } from "../../common/parameters/Pagination";
import { CreateOrganizationRequest } from "../../generated/models/CreateOrganizationRequest.generated";
import { SearchOrganizationsRequest } from "../../generated/models/SearchOrganizationsRequest.generated";
import { UpdateOrganizationRequest } from "../../generated/models/UpdateOrganizationRequest.generated";
import { getPagination } from "../../utils/RequestUtil";
import { OrganizationsController } from "./controllers/OrganizationsController";
import { Permit } from "../auth/middleware/Permit";
import { CreateMembershipRequest } from "../../generated/models/CreateMembershipRequest.generated";

@Service()
export class OrganizationsRoutes {
	constructor(public organizationsController: OrganizationsController) {}

	static readonly basePath: string = "/organizations";

	public getRouter(): Router {
		const router = express.Router();

		router
			.get(OrganizationsRoutes.basePath + "/", (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference;
				const pagination: Pagination = getPagination(req);

				if (asReference) {
					this.organizationsController.listOrganizationsAsReference(res, pagination);
				} else {
					this.organizationsController.listOrganizations(res, pagination);
				}
			})
			.post(
				OrganizationsRoutes.basePath + "/",
				passport.authenticate("authenticated-user", { session: false }),
				(req: express.Request, res: express.Response) => {
					const createOrganizationRequest = req.body as CreateOrganizationRequest;
					this.organizationsController.createOrganization(res, createOrganizationRequest);
				},
			);

		router.post(
			OrganizationsRoutes.basePath + "/bulk-create",
			passport.authenticate("authenticated-user", { session: false }),
			Permit.authorizesForAction(),
			(req: express.Request, res: express.Response) => {
				const createOrganizationsRequest = req.body as CreateOrganizationRequest[];

				this.organizationsController.createOrganizations(res, createOrganizationsRequest);
			},
		);

		router.post(OrganizationsRoutes.basePath + "/search", (req: express.Request, res: express.Response) => {
			const pagination: Pagination = getPagination(req);

			const searchOrganizationsRequest = req.body as SearchOrganizationsRequest;
			this.organizationsController.searchOrganizations(res, searchOrganizationsRequest, pagination);
		});

		router.post(
			OrganizationsRoutes.basePath + "/:identifier/memberships",
			(req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const createMembershipRequest = req.body as CreateMembershipRequest;
				this.organizationsController.createMembership(res, identifier, createMembershipRequest);
			},
		);

		router
			.get(OrganizationsRoutes.basePath + "/:identifier", (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if (asReference) {
					this.organizationsController.getOrganizationReferenceById(res, identifier);
				} else {
					this.organizationsController.getOrganizationById(res, identifier);
				}
			})
			.patch(
				OrganizationsRoutes.basePath + "/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const updateOrganizationRequest = req.body as UpdateOrganizationRequest;
					this.organizationsController.updateOrganization(res, identifier, updateOrganizationRequest);
				},
			);

		router
			.post(
				OrganizationsRoutes.basePath + "/:identifier/activate",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.activateOrganization(res, identifier);
				},
			)
			.post(
				OrganizationsRoutes.basePath + "/:identifier/deactivate",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.deactivateOrganization(res, identifier);
				},
			)
			.post(
				OrganizationsRoutes.basePath + "/:identifier/retire",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.retireOrganization(res, identifier);
				},
			)
			.post(
				OrganizationsRoutes.basePath + "/:identifier/archive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.archiveOrganization(res, identifier);
				},
			)
			.post(
				OrganizationsRoutes.basePath + "/:identifier/unarchive",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesForAction(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.unarchiveOrganization(res, identifier);
				},
			);

		return router;
	}
}
