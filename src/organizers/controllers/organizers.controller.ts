import express from 'express';
import { OrganizersService } from '../services/organizers.service';
import debug from 'debug';
import { Service } from 'typedi';
import { matchedData } from 'express-validator';
import { buildCreateOrganizerDto, CreateOrganizerDto } from '../dtos/create.organizer.dto';
import { buildPatchOrganizerDto } from '../dtos/patch.organizer.dto';
import { Organizer } from '../repositories/organizer';

const log: debug.IDebugger = debug('app:organizers-controller');

@Service()
export class OrganizersController {

	constructor(
		public organizersService: OrganizersService) { }

	async listOrganizers(req: express.Request, res: express.Response) {
		const organizers = await this.organizersService.list(100, 0);

		res = res.status(200).send({ "organizers": organizers });
	}

	async getOrganizerById(req: express.Request, res: express.Response) {
		const data: Record<string, any> = matchedData(req);
		const organizer = await this.organizersService.readById(data.organizerId);
		if (organizer){
			res.status(200).send({ "organizer": organizer });
		} 
		else {
			res.status(404).send({error: {msg: 'Organizer not found'}});
		} 
	}

	async createOrganizer(req: express.Request, res: express.Response) {
		const data: Record<string, any> = matchedData(req);
		const createOrganizerDto = buildCreateOrganizerDto(data);
		const organizerId = await this.organizersService.create(createOrganizerDto);
		res.status(201).send({ id: organizerId });
	}

	async patch(req: express.Request, res: express.Response) {
		
		const data: Record<string, any> = matchedData(req);
		
		const organizerId = data.organizerId;
		const patchOrganizerDto = buildPatchOrganizerDto(data);
		console.log("ID " + organizerId + " BODY " + JSON.stringify(req.body) + " data " + JSON.stringify(data) + " Dto " + JSON.stringify(patchOrganizerDto));
		
		const organizer = await this.organizersService.patchById(organizerId, patchOrganizerDto);
		if(organizer){
			res.status(204).send();
		} 
		else {
			res.status(404).send({error: {msg: 'Organizer not found'}});
		}
	}


	async removeOrganizer(req: express.Request, res: express.Response) {
		const { organizerId } = req.params;
		if(await this.organizersService.deleteById(organizerId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'Organizer not found'}});
		} 
	}

}
