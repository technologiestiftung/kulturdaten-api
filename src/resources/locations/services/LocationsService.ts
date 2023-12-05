import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { Filter } from "../../../generated/models/Filter.generated";
import { Location } from "../../../generated/models/Location.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { SetLocationManagerRequest } from "../../../generated/models/SetLocationManagerRequest.generated";
import { UpdateLocationRequest } from "../../../generated/models/UpdateLocationRequest.generated";
import { LocationsRepository } from "../repositories/LocationsRepository";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { isSuperAdmin } from "../../auth/middleware/PermissionFlag";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { fakeCoordinatess } from "../../../generated/faker/faker.Coordinates.generated";
import { Coordinates } from "../../../generated/models/Coordinates.generated";

@Service()
export class LocationsService {
	constructor(@Inject("LocationsRepository") public locationsRepository: LocationsRepository) {}

	async list(pagination?: Pagination, searchFilter?: Filter) {
		return this.locationsRepository.getLocations(pagination, searchFilter);
	}

	async listAsReferences(pagination?: Pagination, searchFilter?: Filter) {
		return this.locationsRepository.getLocationsAsReferences(pagination, searchFilter);
	}

	async create(resource: CreateLocationRequest, authUser?: AuthUser): Promise<Reference | null> {
		if (!authUser && !isSuperAdmin(authUser)) {
			delete resource["manager"];
		}
		if (authUser?.organizationIdentifier) {
			resource.manager = { referenceType: "type.Organization", referenceId: authUser.organizationIdentifier };
		}
		
		// query geolocation via address if geolocation is null
		if (!resource.coordinates) {
			if (resource.address && resource.borough) {		
				// assemble geolocation request		
				var queryAddressParameter = resource.address.streetAddress + ' ' + resource.address.postalCode + ' ' + resource.borough + ' ' + resource.address.addressLocality + ' Germany';
				queryAddressParameter = encodeURIComponent(queryAddressParameter);
				var apiRequest = "https://geocode.maps.co/search?q=" + queryAddressParameter;				
				var coordinates = await LocationsService.getLatLon(apiRequest);
				// create a Coordinates instance with lat / lon and assign it to resource.coordinates
				if (coordinates) {
					resource.coordinates = coordinates;
				}
				// introduce a delay (throttle) before making the next request (due to the rate limit of the API)
				await new Promise(resolve => setTimeout(resolve, 1000)); // 1000 milliseconds = 1 second
			}
			else {
				// log that address is unset and thus geolocation cannot be queried				
				console.warn("Address is unset for location '%s', cannot query geolocation.", resource.title);	
			}
		}

		return this.locationsRepository.addLocation(resource, authUser);
	}

	search(filter: Filter, pagination?: Pagination): Promise<Location[]> {
		return this.locationsRepository.searchLocations(filter, pagination);
	}

	static async getLatLon(apiRequest: RequestInfo): Promise<Coordinates | null>{
		try {
			const response = await fetch(
				apiRequest,
				{
					method: 'GET'
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		
			const data = await response.json();
			if (data.size > 1) {
				// TODO: How do we properly handle this?				
				console.warn('Got multiple address lookup gelocations %i', data.size);
			} else if (data.size = 0) {
				console.warn('Did not find geolocation. Request URL: %s', apiRequest);
			}
			return { latitude: data[0]['lat'], longitude: data[0]['lon'] }

		} catch (error) {
			console.error('Error fetching data:', error);			
			return null;
		}		
	}

	async countLocations(searchFilter?: Filter): Promise<number> {
		return this.locationsRepository.countLocations(searchFilter);
	}

	async readById(id: string): Promise<Location | null> {
		return this.locationsRepository.getLocationByIdentifier(id);
	}

	async readReferenceById(id: string): Promise<Reference | null> {
		return this.locationsRepository.getLocationReferenceByIdentifier(id);
	}

	async update(id: string, updateLocationRequest: UpdateLocationRequest) {
		return this.locationsRepository.updateLocationById(id, updateLocationRequest);
	}

	setLocationManager(identifier: string, setLocationManagerRequest: SetLocationManagerRequest): Promise<boolean> {
		const reference = {
			referenceType: "type.Organization",
			referenceId: setLocationManagerRequest.organizationIdentifier,
			referenceLabel: setLocationManagerRequest.alternativeDisplayName,
		};
		return this.locationsRepository.setLocationManager(identifier, reference);
	}

	deleteLocationManager(identifier: string): Promise<boolean> {
		return this.locationsRepository.deleteLocationManager(identifier);
	}

	archive(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.archived");
	}
	unarchive(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.unpublished");
	}

	async publishLocation(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.published");
	}

	async unpublishLocation(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateStatus(identifier, "location.unpublished");
	}

	permanentlyCloseLocation(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateOpeningStatus(identifier, "location.permanentlyClosed");
	}
	openLocation(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateOpeningStatus(identifier, "location.opened");
	}
	closeLocation(identifier: string): Promise<boolean> {
		return this.locationsRepository.updateOpeningStatus(identifier, "location.closed");
	}
}
