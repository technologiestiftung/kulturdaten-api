import express from 'express';
import debug from 'debug';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:organizers-controller');

@Service()
export class OrganizersMiddleware {

	async extractOrganizerId(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		req.body.id = req.params.organizerId;
		next();
	}

}
