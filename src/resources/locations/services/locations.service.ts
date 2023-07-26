import { LocationsRepository } from '../repositories/locations.repository';
import { Location } from '../../../generated/models/Location.generated';
import { Inject, Service } from 'typedi';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';
import { SearchLocationsRequest } from '../../../generated/models/SearchLocationsRequest.generated';
import { SetLocationManagerRequest } from '../../../generated/models/SetLocationManagerRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';

@Service()
export class LocationsService{

	constructor(@Inject('LocationsRepository') public locationsRepository: LocationsRepository){}


	async list(limit: number, page: number) {
		return this.locationsRepository.getLocations(limit,page);
	}

	async listAsReferences(limit: number, page: number) {
		return this.locationsRepository.getLocationsAsReferences(limit,page);
	}

	async create(resource: CreateLocationRequest) : Promise<Reference | null>{
		return this.locationsRepository.addLocation(resource);
	}

	search(searchLocationsRequest: SearchLocationsRequest) : Promise<Location[]> {
		return this.locationsRepository.searchLocations(searchLocationsRequest.searchFilter? searchLocationsRequest.searchFilter : {});
	}

	async readById(id: string) {
		return this.locationsRepository.getLocationByIdentifier(id);
	}


	async readReferenceById(id: string) {
		return this.locationsRepository.getLocationReferenceByIdentifier(id);
	}

	async update(id: string, updateLocationRequest: UpdateLocationRequest) {
		return this.locationsRepository.updateLocationById(id, updateLocationRequest);
	}

	setLocationManager(identifier: string, setLocationManagerRequest: SetLocationManagerRequest): Promise<boolean> {
		const reference = {
			referenceType: 'type.Organization',
			referenceId: setLocationManagerRequest.organizationIdentifier,
			referenceLabel: setLocationManagerRequest.alternativeDisplayName
		}
		return this.locationsRepository.setLocationManager(identifier, reference);
	}

	deleteLocationManager(identifier: string): Promise<boolean> {
		return this.locationsRepository.deleteLocationManager(identifier);
	}

	archive(identifier: string)  : Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.archived");
	}
	unarchive(identifier: string) : Promise<boolean>  {
		return this.locationsRepository.updateStatus(identifier, "location.unpublished");
	}
	
	async publishLocation(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.published");
	}

	async unpublish(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.unpublished");
	  }


	permanentlyCloseLocation(identifier: string): Promise<boolean>  {
		return this.locationsRepository.updateOpeningStatus(identifier, "location.permanentlyClosed");
	}
	openLocation(identifier: string) : Promise<boolean> {
		return this.locationsRepository.updateOpeningStatus(identifier, "location.opened");
	}
	closeLocation(identifier: string) : Promise<boolean> {
		return this.locationsRepository.updateOpeningStatus(identifier, "location.closed");
	}


}
