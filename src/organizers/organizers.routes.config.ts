import { CommonRoutesConfig } from '../common/common.routes.config';
import { OrganizersController } from './controllers/organizers.controller';
import express from 'express';
import debug from 'debug';
import { Service } from 'typedi';
import { OrganizersMiddleware } from './middleware/organizers.middleware';

const log: debug.IDebugger = debug('app:organizers-routes');

@Service()
export class OrganizersRoutes extends CommonRoutesConfig {

	constructor(
		public organizersController: OrganizersController,
		public organizersMiddleware: OrganizersMiddleware,) {
		super('OrganizersRoutes');
	}

	configureRoutes(app: express.Application, preRoute: string): express.Application {
		app.route(`${preRoute}/v1/organizers`)
			.all((req, res, next) => {
				next();
			})
			.get(
				(req, res, next) => {
					this.organizersController.listOrganizers(req, res);
				})
			.post(
				(req, res, next) => {
					this.organizersController.createOrganizer(req, res);
				});

		app.param(`organizerId`, (req, res, next) => this.organizersMiddleware.extractOrganizerId(req, res, next));
		
		app.route(`${preRoute}/v1/organizers/:organizerId`)
			.all((req, res, next) => {
				next();
			})
			.get((req, res, next) => {
				this.organizersController.getOrganizerById(req, res);
			})
			.put((req, res, next) => {
				this.organizersController.put(req, res);
			})
			.patch((req, res, next) => {
				this.organizersController.patch(req, res);
			})
			.delete((req, res, next) => {
				this.organizersController.removeOrganizer(req, res);
			});

		return app;
	}
}