import debug from 'debug';
import express, { Router } from 'express';
import { body,  matchedData,  param,  validationResult } from 'express-validator';
import { Service } from 'typedi';
import { OrganizersController } from './controllers/organizers.controller';


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
					body('name', 'Organizer name is required').notEmpty()
				],
				(req: express.Request, res: express.Response) => {
					// TODO: middleware for validation-error
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return res.status(400).json({
							errors: errors.array()
						});
					}
					
					this.organizersController.createOrganizer(req, res);
				});

		router
			.get(
				'/:organizerId',
				[
					param('organizerId', 'Organizer ID is required').notEmpty()
				],
				(req: express.Request, res: express.Response) => {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return res.status(400).json({
							errors: errors.array()
						});
					}
					const data: Record<string, any> = matchedData(req);
					this.organizersController.getOrganizerById(req, res, data);
				})
			.patch(
				'/:organizerId',
				(req, res) => {
					this.organizersController.patch(req, res);
				})
			.delete(
				'/:organizerId',
				(req, res) => {
					this.organizersController.removeOrganizer(req, res);
				});


		return router;
	}
}
