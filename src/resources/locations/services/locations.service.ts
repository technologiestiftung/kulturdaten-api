import { LocationsRepository } from '../repositories/locations.repository';
import { Location } from '../../../generated/models/Location.generated';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { Inject, Service } from 'typedi';
import { CreateLocation } from '../../../generated/models/CreateLocation.generated';
import { PatchLocation } from '../../../generated/models/PatchLocation.generated';
import { PublishLocationCommand } from '../../../generated/models/PublishLocationCommand.generated';
import { ExecutionResult } from '../../../generated/models/ExecutionResult.generated';
import { schemaForLocationStatus } from '../../../generated/models/LocationStatus.generated';

@Service()
export class LocationsService implements CRUD {
	
	async searchDuplicates(location: Location) : Promise<Location[]> {
		return this.locationsRepository.searchDuplicates(location);
	}

	constructor(@Inject('LocationsRepository') public locationsRepository: LocationsRepository){}

	async create(resource: CreateLocation) {
		return this.locationsRepository.addLocation(resource);
	}

	async deleteById(id: string) {
		return this.locationsRepository.removeLocationById(id);
	}

	async list(limit: number, page: number) {
		return this.locationsRepository.getLocations(limit,page);
	}

	async readById(id: string) {
		return this.locationsRepository.getLocationByIdentifier(id);
	}

	async patchById(id: string, resource: PatchLocation) {
		return this.locationsRepository.updateLocationById(id, resource);
	}

	async publishLocation(publishLocationCommand: PublishLocationCommand): Promise<ExecutionResult> {
		if(!publishLocationCommand.payload || !publishLocationCommand.payload.locationIdentifier) return {success: false, message: 'Missing payload'};
		return this.locationsRepository.updateLocationVisibility(publishLocationCommand.payload.locationIdentifier, "visibility.published");
	}


}
