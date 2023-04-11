import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganization } from '../generatedModels/CreateOrganization.generated';
import { PatchOrganization } from '../generatedModels/PatchOrganization.generated';


const log: debug.IDebugger = debug('app:organizations-routes');

@Service()
export class OrganizationsRoutes {

	constructor(
		public organizationsController: OrganizationsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				(req: express.Request, res: express.Response) => {
					this.organizationsController.listOrganizations(res);
				})
			.post(
				'/',
				(req: express.Request, res: express.Response) => {
					const createOrganization = req.body as CreateOrganization;
					this.organizationsController.createOrganization(res, createOrganization);
				});

		router
			.get(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.getOrganizationById(res, identifier);
				})
			.patch(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const patchOrganization = req.body as PatchOrganization;
					this.organizationsController.patch(res, identifier, patchOrganization);
				})
			.delete(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.organizationsController.removeOrganization(res, identifier);
				});


		return router;
	}
}
