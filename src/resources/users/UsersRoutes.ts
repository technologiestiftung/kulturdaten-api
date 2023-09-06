import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Pagination } from "../../common/parameters/Pagination";
import { CreateUserRequest } from "../../generated/models/CreateUserRequest.generated";
import { UpdateUserPasswordRequest } from "../../generated/models/UpdateUserPasswordRequest.generated";
import { UpdateUserRequest } from "../../generated/models/UpdateUserRequest.generated";
import { getPagination } from "../../utils/RequestUtil";
import { Permit } from "../auth/middleware/Permit";
import { UsersController } from "./controllers/UsersController";
import { CheckUsers } from "./middleware/CheckUsers";
import { UsersService } from "./services/UsersService";

const log: debug.IDebugger = debug("app:users-routes");

@Service()
export class UsersRoutes {
	constructor(
		public usersController: UsersController,
		public usersService: UsersService,
	) {}

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				"/",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const pagination: Pagination = getPagination(req);

					this.usersController.listUsers(res, pagination);
				},
			)
			.post(
				"/",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdmin(),
				CheckUsers.eMailIsNotExist(this.usersService),
				(req: express.Request, res: express.Response) => {
					const createUser = req.body as CreateUserRequest;
					this.usersController.createUser(res, createUser);
				},
			);

		router
			.get(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.usersController.getUserById(res, identifier);
				},
			)
			.delete(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.usersController.removeUser(res, identifier);
				},
			)
			.patch(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				Permit.authorizesAsAdminOrSameUser(),
				Permit.onlyAdminCanChancePermissions(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const patchUser = req.body as UpdateUserRequest;
					this.usersController.patch(res, identifier, patchUser);
				},
			);

		router.patch("/:identifier/updatePassword", (req: express.Request, res: express.Response) => {
			const identifier = req.params.identifier;
			const updatePasswordRequest = req.body as UpdateUserPasswordRequest;
			this.usersController.updateUserPassword(res, identifier, updatePasswordRequest);
		});

		return router;
	}
}
