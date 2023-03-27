import { PermissionFlag } from "./auth.permissionflag.enum"
import express from 'express';
import { User } from "../../users/repositories/user";
import { matchedData } from "express-validator";


export class permit {


	static authorizesAsAdminOrSameUser = () =>
		 (req: express.Request, res: express.Response, next: express.NextFunction) => {
			const data: Record<string, any> = matchedData(req);
			if (!req.user || !data.userId) {
				res.status(403).send();
			}
			const u: User = req.user as User;

			if (u.id === data.userId) {
				next();
			} else {
				this.authorizesAsAdmin()(req, res, next);
			}
		}

	static authorizesAs = (requiredPermission: PermissionFlag) =>
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
		}

	static authorizesAsAdmin = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
		this.authorizesAs(PermissionFlag.ADMIN_PERMISSION)(req, res, next);
	}

	static onlyAdminCanChancePermissions = () => (req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (this.isUserAdmin(req)) {
			next();
		} else {
			delete req.body.permissionFlags;
			next();
		}
	}

	static isUserAdmin(req: express.Request){
		if(!req.user) return false;
		const u: User = req.user as User;
		if (u.permissionFlags ? u.permissionFlags & PermissionFlag.ADMIN_PERMISSION : false) {
			return true;
		} else {
			return false;
		}
	}



}



