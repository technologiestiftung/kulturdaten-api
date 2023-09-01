import debug from "debug";
import express, { Router } from "express";
import passport from "passport";
import { Service } from "typedi";
import { Pagination } from "../../common/parameters/Pagination";
import { CreateUserRequest } from "../../generated/models/CreateUserRequest.generated";
import { UpdateUserPasswordRequest } from "../../generated/models/UpdateUserPasswordRequest.generated";
import { UpdateUserRequest } from "../../generated/models/UpdateUserRequest.generated";
import { getPagination } from "../../utils/RequestUtil";
import { permit } from "../auth/middleware/auth.middleware";
import { UsersController } from "./controllers/users.controller";
import { checkUsers } from "./middleware/users.middleware";
import { UsersService } from "./services/users.service";

const log: debug.IDebugger = debug("app:users-routes");

@Service()
export class UsersRoutes {
	constructor(public usersController: UsersController, public usersService: UsersService) {}

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				"/",
				passport.authenticate("authenticated-user", { session: false }),
				permit.authorizesAsAdmin(),
				(req: express.Request, res: express.Response) => {
					const pagination: Pagination = getPagination(req);

					this.usersController.listUsers(res, pagination);
				}
			)
			.post(
				"/",
				passport.authenticate("authenticated-user", { session: false }),
				permit.authorizesAsAdmin(),
				checkUsers.eMailIsNotExist(this.usersService),
				(req: express.Request, res: express.Response) => {
					const createUser = req.body as CreateUserRequest;
					this.usersController.createUser(res, createUser);
				}
			);

		router
			.get(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.usersController.getUserById(res, identifier);
				}
			)
			.delete(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.usersController.removeUser(res, identifier);
				}
			)
			.patch(
				"/:identifier",
				passport.authenticate("authenticated-user", { session: false }),
				permit.authorizesAsAdminOrSameUser(),
				permit.onlyAdminCanChancePermissions(),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const patchUser = req.body as UpdateUserRequest;
					this.usersController.patch(res, identifier, patchUser);
				}
			);

		router.patch("/:identifier/updatePassword", (req: express.Request, res: express.Response) => {
			const identifier = req.params.identifier;
			const updatePasswordRequest = req.body as UpdateUserPasswordRequest;
			this.usersController.updateUserPassword(res, identifier, updatePasswordRequest);
		});

		return router;
	}
}
