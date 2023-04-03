import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { OrganizersController } from './controllers/organizers.controller';
import { CreateOrganizer } from './dtos/create.organizer.dto.generated';
import { PatchOrganizer } from './dtos/patch.organizer.dto.generated';


const log: debug.IDebugger = debug('app:organizers-routes');

@Service()
export class OrganizersRoutes {

	constructor(
		public organizersController: OrganizersController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				(req: express.Request, res: express.Response) => {
					this.organizersController.listOrganizers(res);
				})
			.post(
				'/',
				(req: express.Request, res: express.Response) => {
					const createOrganizer = req.body as CreateOrganizer;
					this.organizersController.createOrganizer(res, createOrganizer);
				});

		router
			.get(
				'/:organizerId',
				(req: express.Request, res: express.Response) => {
					const organizerId = req.params.organizerId;
					this.organizersController.getOrganizerById(res, organizerId);
				})
			.patch(
				'/:organizerId',
				(req: express.Request, res: express.Response) => {
					const organizerId = req.params.organizerId;
					const patchOrganizer = req.body as PatchOrganizer;
					this.organizersController.patch(res, organizerId, patchOrganizer);
				})
			.delete(
				'/:organizerId',
				(req: express.Request, res: express.Response) => {
					const organizerId = req.params.organizerId;
					this.organizersController.removeOrganizer(res, organizerId);
				});


		return router;
	}
}
