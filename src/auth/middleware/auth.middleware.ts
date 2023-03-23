import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum"
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
			console.log(" ... " + data.userId);
			console.log(JSON.stringify(u));
			
			if (u.id === data.userId){
				next();
			} else {
				this.authorizesAsAdmin( )(req,res,next);
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
		this.authorizesAs( PermissionFlag.ADMIN_PERMISSION )(req,res,next);
	}

}

