import express from 'express';
import { LocationsService } from '../services/locations.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateLocation } from '../../../generated/models/CreateLocation.generated';
import { PatchLocation } from '../../../generated/models/PatchLocation.generated';

const log: debug.IDebugger = debug('app:locations-controller');

@Service()
export class LocationsController {

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

	async createLocation(res: express.Response, createLocation: CreateLocation) {
		const locationId = await this.locationsService.create(createLocation);
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
