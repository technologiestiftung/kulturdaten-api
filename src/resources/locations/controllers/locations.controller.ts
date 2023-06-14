import express from 'express';
import { LocationsService } from '../services/locations.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateLocation } from '../../../generated/models/CreateLocation.generated';
import { PatchLocation } from '../../../generated/models/PatchLocation.generated';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';
import { ClaimLocationRequest } from '../../../generated/models/ClaimLocationRequest.generated';
import { SearchLocationsRequest } from '../../../generated/models/SearchLocationsRequest.generated';
import { SetLocationManagerRequest } from '../../../generated/models/SetLocationManagerRequest.generated';

const log: debug.IDebugger = debug('app:locations-controller');

@Service()
export class LocationsController {
	searchLocations(res: express.Response<any, Record<string, any>>, searchLocationsRequest: SearchLocationsRequest) {
		throw new Error('Method not implemented.');
	}
	claimLocation(res: express.Response<any, Record<string, any>>, identifier: string, claimLocationRequest: ClaimLocationRequest) {
		throw new Error('Method not implemented.');
	}

	unarchiveLocation(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	permanentlyCloseLocation: any;
	archiveLocation: any;
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

	constructor(
		public locationsService: LocationsService) { }

	async listLocations(res: express.Response) {
		const locations = await this.locationsService.list(100, 0);

		res = res.status(200).send({ "locations": locations });
	}

	async getLocationById(res: express.Response, locationId: string) {
		
		const location = await this.locationsService.readById(locationId);
		if (location){
			res.status(200).send({ "location": location });
		} 
		else {
			res.status(404).send({error: {msg: 'Location not found'}});
		} 
	}

	async createLocation(res: express.Response, createLocationRequest: CreateLocationRequest) {
		const locationId = await this.locationsService.create(createLocationRequest);
		res.status(201).send({ identifier: locationId });
	}

	async patch(res: express.Response, locationId: string, patchLocation: PatchLocation) {
		if(await this.locationsService.patchById(locationId, patchLocation)){
			res.status(204).send();
		} 
		else {
			res.status(404).send({error: {msg: 'Location not found'}});
		}
	}


	async removeLocation(res: express.Response, locationId: string) {
		if(await this.locationsService.deleteById(locationId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'Location not found'}});
		} 
	}

}
