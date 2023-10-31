import express from "express";
import { PermissionFlag } from "./PermissionFlag";
import { checkPermissionForRole } from "./Roles";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { PermissionFilter } from "../filter/PermissionFilter";
import { ResourcePermissionController } from "../controllers/ResourcePermissionController";

export class Permit {
	static authorizesToManipulateResource =
		(resourceController: ResourcePermissionController) =>
		(req: express.Request, res: express.Response, next: express.NextFunction) => {
			const identifier = req.params.identifier;
			const authUser = req.user as AuthUser;

			if (!req.user || !identifier || !authUser || !authUser.organizationIdentifier) {
				res.status(403).send();
				return;
			}

			const permissionFilter = PermissionFilter.buildOwnershipPermissionFilter(
				identifier,
				authUser.organizationIdentifier,
			);

			(async () => {
				try {
					const isExist = await resourceController.isExist(permissionFilter);

					if (!isExist) {
						res.status(403).send();
						return;
					}
					next();
				} catch (error) {
					res.status(500).send();
				}
			})();
		};

	static authorizesForAction = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const action = req.method + ":" + req.route.path;
		if (!req.user) {
			res.status(403).send();
			return;
		}
		const member: AuthUser = req.user as AuthUser;

		if (checkPermissionForRole(member.role, action)) {
			next();
			return;
		} else {
			res.status(403).send();
			return;
		}
	};

	static authorizesAsAdminOrSameUser =
		() => (req: express.Request, res: express.Response, next: express.NextFunction) => {
			const identifier = req.params.identifier;
			if (!req.user || !identifier) {
				res.status(403).send();
				return;
			}
			const u: AuthUser = req.user as AuthUser;

			if (u.identifier === identifier) {
				next();
				return;
			} else {
				this.authorizesAsAdmin()(req, res, next);
			}
		};

	static authorizesAs =
		(requiredPermission: PermissionFlag) =>
		(req: express.Request, res: express.Response, next: express.NextFunction) => {
			if (!req.user) {
				res.status(403).send();
				return;
			}
			const u: AuthUser = req.user as AuthUser;
			if (u.permissionFlags ? u.permissionFlags & requiredPermission : false) {
				next();
				return;
			} else {
				res.status(403).send();
				return;
			}
		};

	static authorizesAsAdmin = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
		this.authorizesAs(PermissionFlag.ADMIN_PERMISSION)(req, res, next);
	};

	static onlyAdminCanChancePermissions =
		() => (req: express.Request, res: express.Response, next: express.NextFunction) => {
			if (this.isUserAdmin(req)) {
				next();
				return;
			} else {
				delete req.body.permissionFlags;
				next();
				return;
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
