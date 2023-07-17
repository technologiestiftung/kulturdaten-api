import debug from 'debug';
import { Location } from '../../../generated/models/Location.generated';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { Filter } from '../../../generated/models/Filter.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface LocationsRepository {
	deleteLocationManager(identifier: string): Promise<boolean>;

	updateOpeningStatus(identifier: string, openingStatus: Location['openingStatus']): Promise<boolean>;

	updateStatus(identifier: string, status: Location['status']): Promise<boolean>;


	setLocationManager(identifier: string, reference: Reference): Promise<boolean>;

	searchLocations(filter: Filter): Promise<Location[]> ;

	addLocation(createLocation: CreateLocationRequest): Promise<Reference | null>;

	getLocations(limit:number, page:number) : Promise<Location[] | null>;

	getLocationByIdentifier(locationId: string) : Promise<Location | null>;

	updateLocationById(locationId: string, locationFields: UpdateLocationRequest ): Promise<boolean>;

	removeLocationById(locationId: string) :  Promise<boolean>;

}

