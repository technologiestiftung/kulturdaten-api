import express from "express";
import { User } from "../../../generated/models/User.generated";
import { PermissionFlag } from "./PermissionFlag";
import { OrganizationMember } from "../OrganizationMember";
import { checkPermissionForRole } from "./Roles";

export class Permit {
	static authorizesForAction =
		() => (req: express.Request, res: express.Response, next: express.NextFunction) => {
			console.log(req.route.path); // Ausgabe wäre '/example'
			console.log(req.originalUrl); // Ausgabe könnte '/example?name=value' sein
			console.log(req.method); // Ausgabe wäre 'GET'
			console.log(`${req.method}:${req.route.path}`);
		
			const action = req.method + ":" + req.route.path;
			console.log(action);

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
			const u: User = req.user as User;

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
			const u: User = req.user as User;
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
		const u: User = req.user as User;
		if (u.permissionFlags ? u.permissionFlags & PermissionFlag.ADMIN_PERMISSION : false) {
			return true;
		} else {
			return false;
		}
	}
}
