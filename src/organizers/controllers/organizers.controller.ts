import express from 'express';
import { OrganizersService } from '../services/organizers.service';
import { DateUtil }  from '../../utils/DateUtil';
import debug from 'debug';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:organizers-controller');

@Service()
export class OrganizersController {

	constructor(
		public organizersService: OrganizersService, public dateUtil: DateUtil){}

	async listOrganizers(req: express.Request, res: express.Response) {
		const organizers = await this.organizersService.list(100, 0);
		
		res = res.status(200).send({ "organizers":organizers});
	}

	async getOrganizerById(req: express.Request, res: express.Response) {
		const { organizerId } = req.params;
		const organizer = await this.organizersService.readById(organizerId);
		if(organizer) res.status(200).send({ "organizer":organizer});
		else res.status(404).send();
	}

	async createOrganizer(req: express.Request, res: express.Response) {
		const nowAsString = this.dateUtil.now();
		req.body.created = nowAsString;
		req.body.updated = nowAsString;
		const organizerId = await this.organizersService.create(req.body);
		res.status(201).send({ id: organizerId });
	}

	async patch(req: express.Request, res: express.Response) {
		const { organizerId } = req.params;
		req.body.updated = this.dateUtil.now();
		log(await this.organizersService.patchById(organizerId, req.body));
		res.status(204).send();
	}

	async put(req: express.Request, res: express.Response) {
		const { organizerId } = req.params;
		req.body.updated = this.dateUtil.now();
		log(await this.organizersService.putById(organizerId, req.body));
		res.status(204).send();
	}

	async removeOrganizer(req: express.Request, res: express.Response) {
		const { organizerId } = req.params;
		log(await this.organizersService.deleteById(organizerId));
		res.status(204).send();
	}

}
