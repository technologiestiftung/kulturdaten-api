import express from 'express';
import { LocationsService } from '../services/locations.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';
import { ClaimLocationRequest } from '../../../generated/models/ClaimLocationRequest.generated';
import { SearchLocationsRequest } from '../../../generated/models/SearchLocationsRequest.generated';
import { SetLocationManagerRequest } from '../../../generated/models/SetLocationManagerRequest.generated';
import { ErrorResponseBuilder, SuccessResponseBuilder } from '../../../common/responses/response.builders';

const log: debug.IDebugger = debug('app:locations-controller');

@Service()
export class LocationsController {

	constructor(
		public locationsService: LocationsService) { }

	async listLocations(res: express.Response) {
		const locations = await this.locationsService.list(100, 0);
		if (locations) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ locations: locations }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Locations not found").build());
		}
	}

	async getLocationById(res: express.Response, locationId: string) {
		const location = await this.locationsService.readById(locationId);
		if (location) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ location: location }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Location not found").build());
		}
	}

	async createLocation(res: express.Response, createLocationRequest: CreateLocationRequest) {
		const locationId = await this.locationsService.create(createLocationRequest);
		if (locationId) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ identifier: locationId } ).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An location cannot be created with the data.").build());
		}
	}

	searchLocations(res: express.Response<any, Record<string, any>>, searchLocationsRequest: SearchLocationsRequest) {
		throw new Error('Method not implemented.');
	}
	claimLocation(res: express.Response<any, Record<string, any>>, identifier: string, claimLocationRequest: ClaimLocationRequest) {
		throw new Error('Method not implemented.');
	}

	unarchiveLocation(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}

	closeLocation(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	openLocation(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	deleteLocationManager(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	setLocationManager(res: express.Response<any, Record<string, any>>, identifier: string, setLocationManagerRequest: SetLocationManagerRequest) {
		throw new Error('Method not implemented.');
	}
	updateLocation(res: express.Response<any, Record<string, any>>, identifier: string, updateLocationRequest: UpdateLocationRequest) {
		throw new Error('Method not implemented.');
	}

	archiveLocation(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	permanentlyCloseLocation(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}

}
