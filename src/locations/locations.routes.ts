import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { LocationsController } from './controllers/locations.controller';
import { CreateLocation } from '../generated/models/CreateLocation.generated';
import { PatchLocation } from '../generated/models/PatchLocation.generated';


const log: debug.IDebugger = debug('app:locations-routes');

@Service()
export class LocationsRoutes {

	constructor(
		public locationsController: LocationsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get(
				'/',
				(req: express.Request, res: express.Response) => {
					this.locationsController.listLocations(res);
				})
			.post(
				'/',
				(req: express.Request, res: express.Response) => {
					const createLocation = req.body as CreateLocation;
					this.locationsController.createLocation(res, createLocation);
				});

		router
			.get(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.getLocationById(res, identifier);
				})
			.patch(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const patchLocation = req.body as PatchLocation;
					this.locationsController.patch(res, identifier, patchLocation);
				})
			.delete(
				'/:identifier',
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.removeLocation(res, identifier);
				});


		return router;
	}
}
