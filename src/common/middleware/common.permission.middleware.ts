import express from 'express';
import { PermissionFlag } from './common.permissionflag.enum';
import debug from 'debug';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:common-permission-middleware');

@Service()
export class CommonPermissionMiddleware {

	async permissionFlagRequired(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction, 
		requiredPermissionFlag: PermissionFlag) {
			try {
				const userPermissionFlags = parseInt(
					res.locals.jwt.permissionFlags
				);
				if (userPermissionFlags & requiredPermissionFlag) {
					next();
				} else {
					res.status(403).send();
				}
			} catch (e) {
				log(e);
			}
	}

	async onlySameUserOrAdminCanDoThisAction(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		if (
			req.params &&
			req.params.userId &&
			req.params.userId === res.locals.jwt.userId
		) {
			return next();
		} else {
			await this.permissionFlagRequired(req,res,next,PermissionFlag.ADMIN_PERMISSION);
		}
	}
}