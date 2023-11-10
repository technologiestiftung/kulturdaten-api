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

@Service()
export class LocationsService {
	constructor(@Inject("LocationsRepository") public locationsRepository: LocationsRepository) {}

	async list(pagination?: Pagination) {
		return this.locationsRepository.getLocations(pagination);
	}

	async listAsReferences(pagination?: Pagination) {
		return this.locationsRepository.getLocationsAsReferences(pagination);
	}

	async create(resource: CreateLocationRequest, authUser?: AuthUser): Promise<Reference | null> {
		if (!authUser && !isSuperAdmin(authUser)) {
			delete resource["manager"];
		}
		if (authUser?.organizationIdentifier) {
			resource.manager = { referenceType: "type.Organization", referenceId: authUser.organizationIdentifier };
		}
		return this.locationsRepository.addLocation(resource);
	}

	search(filter: Filter, pagination?: Pagination): Promise<Location[]> {
		return this.locationsRepository.searchLocations(filter, pagination);
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

	async unpublish(identifier: string): Promise<boolean> {
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
