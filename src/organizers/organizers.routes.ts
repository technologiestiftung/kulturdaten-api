import debug from 'debug';
import express, { Router } from 'express';
import { body,  matchedData,  param,  validationResult } from 'express-validator';
import { Service } from 'typedi';
import { OrganizersController } from './controllers/organizers.controller';
import { validation } from '../common/middleware/common.validation.middleware';
import { CreateOrganizer } from './dtos/create.organizer.dto.generated';


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
				(req, res) => {
					this.organizersController.listOrganizers(req, res);
				})
			.post(
				'/',
				[
					body('name', 'Organizer name is required').isString().notEmpty(),
					body('description').isString().optional()
				],
				validation.checkErrors(),
				(req: express.Request, res: express.Response) => {
					const data: Record<string, any> = matchedData(req);
					this.organizersController.createOrganizer(req, res, data);
				});

		router
			.get(
				'/:organizerId',
				[
					param('organizerId', 'Organizer ID is required').notEmpty()
				],
				validation.checkErrors(),
				(req: express.Request, res: express.Response) => {
					const data: Record<string, any> = matchedData(req);
					this.organizersController.getOrganizerById(req, res, data);
				})
			.patch(
				'/:organizerId',
				[
					param('organizerId', 'Organizer ID is required').notEmpty(),
					body('name').isString().optional(),
					body('description').isString().optional(),
				],
				validation.checkErrors(),
				(req: express.Request, res: express.Response) => {
					const data: Record<string, any> = matchedData(req);
					this.organizersController.patch(req, res, data);
				})
			.delete(
				'/:organizerId',
				[
					param('organizerId', 'Organizer ID is required').notEmpty()
				],
				validation.checkErrors(),
				(req: express.Request, res: express.Response) => {
					const data: Record<string, any> = matchedData(req);
					this.organizersController.removeOrganizer(req, res, data);
				});


		return router;
	}
}
