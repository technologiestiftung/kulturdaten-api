import { LocationsRepository } from '../repositories/locations.repository';
import { Location } from '../../../generated/models/Location.generated';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { Inject, Service } from 'typedi';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';

@Service()
export class LocationsService implements CRUD {
	
	async searchDuplicates(location: Location) : Promise<Location[]> {
		return this.locationsRepository.searchDuplicates(location);
	}

	constructor(@Inject('LocationsRepository') public locationsRepository: LocationsRepository){}

	async create(resource: CreateLocationRequest) {
		return this.locationsRepository.addLocation(resource);
	}

	async deleteById(id: string) : Promise<boolean> {
		return this.locationsRepository.removeLocationById(id);
	}

	async list(limit: number, page: number) {
		return this.locationsRepository.getLocations(limit,page);
	}

	async readById(id: string) {
		return this.locationsRepository.getLocationByIdentifier(id);
	}

	async patchById(id: string, resource: UpdateLocationRequest) {
		return this.locationsRepository.updateLocationById(id, resource);
	}

	async publishLocation(locationIdentifier: string): Promise<boolean> {
		return this.locationsRepository.updateLocationVisibility(locationIdentifier, "visibility.published");
	}


}
