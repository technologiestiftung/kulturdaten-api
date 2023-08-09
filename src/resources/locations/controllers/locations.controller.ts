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
import { SearchLocationsResponse } from '../../../generated/models/SearchLocationsResponse.generated';
import { Reference } from '../../../generated/models/Reference.generated';

const log: debug.IDebugger = debug('app:locations-controller');

@Service()
export class LocationsController {

	constructor(
		public locationsService: LocationsService) { }

	async listLocations(res: express.Response, page: number, pageSize: number) {
		const locations = await this.locationsService.list(page, pageSize);
		const totalCount = await this.locationsService.countLocations();

		if (locations) {
			res.status(200).send(new SuccessResponseBuilder().okResponse(
				{ 
					page: page,
					pageSize: pageSize,
					totalCount: totalCount,
					locations: locations 
				}).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Locations not found").build());
		}
	}

	async listLocationsAsReference(res: express.Response, page: number, pageSize: number) {
		const locationsReferences = await this.locationsService.listAsReferences(page, pageSize);
		const totalCount = await this.locationsService.countLocations();

		if (locationsReferences) {
			res.status(200).send(new SuccessResponseBuilder().okResponse(
				{
					page: page,
					pageSize: pageSize,
					totalCount: totalCount, 
					locationsReferences: locationsReferences 
				}).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Locations not found").build());
		}
	}

	async searchLocations(res: express.Response, searchLocationsRequest: SearchLocationsRequest, page: number, pageSize: number) {
		const filter = searchLocationsRequest.searchFilter ? searchLocationsRequest.searchFilter : {};

		
		const locations = await this.locationsService.search(filter, page, pageSize);
		const totalCount = await this.locationsService.countLocations(filter);

		if (locations) {
			res.status(200).send(new SuccessResponseBuilder<SearchLocationsResponse>().okResponse({ locations: locations }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("No locations matched the search criteria").build());
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

	async getLocationReferenceById(res: express.Response, locationId: string) {
		const location = await this.locationsService.readReferenceById(locationId);
		if (location) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ locationReference: location }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Location not found").build());
		}
	}

	async createLocation(res: express.Response, createLocationRequest: CreateLocationRequest) {
		const locationReference = await this.locationsService.create(createLocationRequest);
		if (locationReference) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ locationReference: locationReference }).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An location cannot be created with the data.").build());
		}
	}

	async createLocations(res: express.Response, createLocationsRequest: CreateLocationRequest[]) {
		const locationsReferences :  Promise<Reference | null> [] = [];
		createLocationsRequest.forEach(async request => {
			locationsReferences.push(this.locationsService.create(request));
		});
		const lR = await Promise.all(locationsReferences)
	
		res.status(201).send(new SuccessResponseBuilder().okResponse({ locations: lR }).build());
	  }


	claimLocation(res: express.Response, identifier: string, claimLocationRequest: ClaimLocationRequest) {
		//TODO: check claim
		this.setLocationManager(res, identifier, claimLocationRequest);
	}

	async unarchiveLocation(res: express.Response, identifier: string) {
		const isUnarchived = await this.locationsService.unarchive(identifier);
		if (isUnarchived) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unarchive the location").build());
		}
	}

	async closeLocation(res: express.Response, identifier: string) {
		const isClosed = await this.locationsService.closeLocation(identifier);
		if (isClosed) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to close the location").build());
		}
	}

	async openLocation(res: express.Response, identifier: string) {
		const isOpened = await this.locationsService.openLocation(identifier);
		if (isOpened) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to open the location").build());
		}
	}

	async permanentlyCloseLocation(res: express.Response, identifier: string) {
		const isPermanentlyClosed = await this.locationsService.permanentlyCloseLocation(identifier);
		if (isPermanentlyClosed) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to permanently close the location").build());
		}
	}

	async deleteLocationManager(res: express.Response, identifier: string) {
		const isDeleted = await this.locationsService.deleteLocationManager(identifier);
		if (isDeleted) {
			res.status(204).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to delete the manager from the location").build());
		}
	}
	async setLocationManager(res: express.Response, identifier: string, setLocationManagerRequest: SetLocationManagerRequest) {
		const isSet = await this.locationsService.setLocationManager(identifier, setLocationManagerRequest);
		if (isSet) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to set the manager for the location").build());
		}
	}
	async updateLocation(res: express.Response, identifier: string, updateLocationRequest: UpdateLocationRequest) {
		const isUpdated = await this.locationsService.update(identifier, updateLocationRequest);
		if (isUpdated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the location").build());
		}
	}

	async archiveLocation(res: express.Response, identifier: string) {
		const isArchived = await this.locationsService.archive(identifier);
		if (isArchived) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to archive the location").build());
		}
	}


}
