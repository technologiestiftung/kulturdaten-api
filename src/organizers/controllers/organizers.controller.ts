import express from 'express';
import { OrganizersService } from '../services/organizers.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateOrganizer } from '../dtos/create.organizer.dto.generated';
import { PatchOrganizer } from '../dtos/patch.organizer.dto.generated';

const log: debug.IDebugger = debug('app:organizers-controller');

@Service()
export class OrganizersController {

	constructor(
		public organizersService: OrganizersService) { }

	async listOrganizers(res: express.Response) {
		const organizers = await this.organizersService.list(100, 0);

		res = res.status(200).send({ "organizers": organizers });
	}

	async getOrganizerById(res: express.Response, organizerId: string) {
		
		const organizer = await this.organizersService.readById(organizerId);
		if (organizer){
			res.status(200).send({ "organizer": organizer });
		} 
		else {
			res.status(404).send({error: {msg: 'Organizer not found'}});
		} 
	}

	async createOrganizer(res: express.Response, createOrganizer: CreateOrganizer) {
		const organizerId = await this.organizersService.create(createOrganizer);
		res.status(201).send({ identifier: organizerId });
	}

	async patch(res: express.Response, organizerId: string, patchOrganizer: PatchOrganizer) {
		if(await this.organizersService.patchById(organizerId, patchOrganizer)){
			res.status(204).send();
		} 
		else {
			res.status(404).send({error: {msg: 'Organizer not found'}});
		}
	}


	async removeOrganizer(res: express.Response, organizerId: string) {
		if(await this.organizersService.deleteById(organizerId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'Organizer not found'}});
		} 
	}

}
