import express from 'express';
import debug from 'debug';
import { OrganizersService } from '../services/organizers.service';
import { Service } from 'typedi';
import { or } from 'ip';

const log: debug.IDebugger = debug('app:organizers-middleware');


@Service()
export class OrganizersMiddleware {


	constructor(
		public organizersService: OrganizersService){}

	async provideOrganizer(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const { organizerId } = req.params;
		if(organizerId){
			const organizer = await this.organizersService.readById(organizerId);
			if(organizer){
				req.organizer = "sed";
			}
		}

		next();
	}


}