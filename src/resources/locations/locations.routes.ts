import debug from 'debug';
import express, { Router } from 'express';
import { Service } from 'typedi';
import { LocationsController } from './controllers/locations.controller';
import { CreateLocationRequest } from '../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../generated/models/UpdateLocationRequest.generated';
import { ClaimLocationRequest } from '../../generated/models/ClaimLocationRequest.generated';
import { SearchLocationsRequest } from '../../generated/models/SearchLocationsRequest.generated';
import { SetLocationManagerRequest } from '../../generated/models/SetLocationManagerRequest.generated';
import { getPagination } from '../../utils/RequestUtil';
import passport from 'passport';


const log: debug.IDebugger = debug('app:locations-routes');

@Service()
export class LocationsRoutes {

	constructor(
		public locationsController: LocationsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get('/', (req: express.Request, res: express.Response) => {
				const asReference = req.query.asReference;
				const { page, pageSize } = getPagination(req);

				if (asReference) {
					this.locationsController.listLocationsAsReference(res, page, pageSize);
				} else {
					this.locationsController.listLocations(res, page, pageSize);
				}
			})
			.post('/',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const createLocationRequest = req.body as CreateLocationRequest;
					this.locationsController.createLocation(res, createLocationRequest);
				});

		router
			.post('/bulk-create',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const createLocationsRequest = req.body as CreateLocationRequest[];

					this.locationsController.createLocations(res, createLocationsRequest);
				});

		router
			.post('/search', (req: express.Request, res: express.Response) => {
				const { page, pageSize } = getPagination(req);

				const searchLocationsRequest = req.body as SearchLocationsRequest;
				this.locationsController.searchLocations(res, searchLocationsRequest, page, pageSize);
			});

		router
			.get('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
				const asReference = req.query.asReference;
				if (asReference) {
					this.locationsController.getLocationReferenceById(res, identifier);
				} else {
					this.locationsController.getLocationById(res, identifier);
				}
			})
			.patch('/:identifier',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const updateLocationRequest = req.body as UpdateLocationRequest;
					this.locationsController.updateLocation(res, identifier, updateLocationRequest);
				});

		router
			.post('/:identifier/manager',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const setLocationManagerRequest = req.body as SetLocationManagerRequest;
					this.locationsController.setLocationManager(res, identifier, setLocationManagerRequest);
				})
			.delete('/:identifier/manager',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.deleteLocationManager(res, identifier);
				});

		router
			.post('/:identifier/open',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.openLocation(res, identifier);
				})
			.post('/:identifier/close',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.closeLocation(res, identifier);
				})
			.post('/:identifier/permanentlyClose',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.permanentlyCloseLocation(res, identifier);
				})
			.post('/:identifier/archive',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.archiveLocation(res, identifier);
				})
			.post('/:identifier/unarchive',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					this.locationsController.unarchiveLocation(res, identifier);
				});

		router
			.post('/:identifier/claim',
				passport.authenticate('authenticated-user', { session: false }),
				(req: express.Request, res: express.Response) => {
					const identifier = req.params.identifier;
					const claimLocationRequest = req.body as ClaimLocationRequest;
					this.locationsController.claimLocation(res, identifier, claimLocationRequest);
				});



		return router;
	}

}
