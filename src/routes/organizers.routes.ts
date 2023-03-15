import debug from 'debug';
import express, { Router } from 'express';
import { check, validationResult } from 'express-validator';
import { Service } from 'typedi';
import { OrganizersController } from '../organizers/controllers/organizers.controller';
import { OrganizersMiddleware } from '../organizers/middleware/organizers.middleware';


const log: debug.IDebugger = debug('app:organizers-routes');

@Service()
export class OrganizersRoutes {

	constructor(
		public organizersController: OrganizersController,
		public organizersMiddleware: OrganizersMiddleware) { }

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
					check('name', 'Organizer name is required').notEmpty()
				],
				(req: express.Request, res: express.Response) => {

					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return res.status(400).json({
							errors: errors.array()
						});
					}
					
					this.organizersController.createOrganizer(req, res);
				})
			.get(
				'/:organizerId',
				[
					check('organizerId', 'Id of organizer is required').notEmpty()
				],
				(req: express.Request, res: express.Response) => {
					const errors = validationResult(req);
					if (!errors.isEmpty()) {
						return res.status(400).json({
							errors: errors.array()
						});
					}
					
					this.organizersController.getOrganizerById(req, res);
				})
			.put(
				'/:organizerId',
				(req, res) => {
					this.organizersController.put(req, res);
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
