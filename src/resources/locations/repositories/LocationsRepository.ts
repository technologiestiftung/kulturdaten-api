import debug from "debug";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Location } from "../../../generated/models/Location.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { UpdateLocationRequest } from "../../../generated/models/UpdateLocationRequest.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { Pagination } from "../../../generated/models/Pagination.generated";

const log: debug.IDebugger = debug("app:locations-repository");

export interface LocationsRepository {
	getLocations(pagination?: Pagination, filter?: Filter): Promise<Location[]>;

	getLocationsAsReferences(pagination?: Pagination, filter?: Filter): Promise<Reference[]>;

	searchLocations(filter?: Filter, pagination?: Pagination): Promise<Location[]>;

	searchAllLocations(filter: Filter, projection?: object): Promise<Location[]>;

	countLocations(filter?: Filter): Promise<number>;

	deleteLocationManager(identifier: string): Promise<boolean>;

	updateOpeningStatus(identifier: string, openingStatus: Location["openingStatus"]): Promise<boolean>;

	updateStatus(identifier: string, status: Location["status"]): Promise<boolean>;

	setLocationManager(identifier: string, reference: Reference): Promise<boolean>;

	addLocation(createLocation: CreateLocationRequest, creator?: AuthUser): Promise<Reference | null>;

	getLocationByIdentifier(locationId: string): Promise<Location | null>;

	getLocationReferenceByIdentifier(locationId: string): Promise<Reference | null>;

	updateLocationById(locationId: string, locationFields: UpdateLocationRequest): Promise<boolean>;

	removeLocationById(locationId: string): Promise<boolean>;
}
