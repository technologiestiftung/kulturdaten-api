import express from "express";
import { PermissionFlag } from "./PermissionFlag";
import { OrganizationMember } from "./OrganizationMember";
import { checkPermissionForRole } from "./Roles";
import { AuthUser } from "../strategies/AuthPasswordStrategy";
import { LocationsController } from "../../locations/controllers/LocationsController";

export class Permit {
	static authorizesToManipulateLocation =
		(locationsController: LocationsController) =>
		(req: express.Request, res: express.Response, next: express.NextFunction) => {
			const identifier = req.params.identifier;
			const user = req.user as AuthUser;

			if (!req.user || !identifier || !user) {
				res.status(403).send();
			}

			const permissionFilter = PermissionFilter.buildLocationPermissionFilter(user.identifier);

			const isExist = locationsController.isLocationExist({identifier});


		};

	static authorizesForAction = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const action = req.method + ":" + req.route.path;
		if (!req.user) {
			res.status(403).send();
			return;
		}
		const member: OrganizationMember = req.user as OrganizationMember;

		if (checkPermissionForRole(member.role, action)) {
			next();
		} else {
			res.status(403).send();
		}
	};

	static authorizesAsAdminOrSameUser =
		() => (req: express.Request, res: express.Response, next: express.NextFunction) => {
			const identifier = req.params.identifier;
			if (!req.user || !identifier) {
				res.status(403).send();
			}
			const u: AuthUser = req.user as AuthUser;

			if (u.identifier === identifier) {
				next();
			} else {
				this.authorizesAsAdmin()(req, res, next);
			}
		};

	static authorizesAs =
		(requiredPermission: PermissionFlag) =>
		(req: express.Request, res: express.Response, next: express.NextFunction) => {
			if (!req.user) {
				res.status(403).send();
			}
			const u: AuthUser = req.user as AuthUser;
			if (u.permissionFlags ? u.permissionFlags & requiredPermission : false) {
				next();
			} else {
				res.status(403).send();
			}
		};

	static authorizesAsAdmin = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
		this.authorizesAs(PermissionFlag.ADMIN_PERMISSION)(req, res, next);
	};

	static onlyAdminCanChancePermissions =
		() => (req: express.Request, res: express.Response, next: express.NextFunction) => {
			if (this.isUserAdmin(req)) {
				next();
			} else {
				delete req.body.permissionFlags;
				next();
			}
		};

	static isUserAdmin(req: express.Request) {
		if (!req.user) return false;
		const u: AuthUser = req.user as AuthUser;
		if (u.permissionFlags ? u.permissionFlags & PermissionFlag.ADMIN_PERMISSION : false) {
			return true;
		} else {
			return false;
		}
	}
}
