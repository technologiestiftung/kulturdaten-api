import debug from 'debug';
import { Location } from '../../../generated/models/Location.generated';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface LocationsRepository {
	searchDuplicates(location: Location): Promise<Location[]>;

	addLocation(createLocation: CreateLocationRequest): Promise<string>;

	getLocations(limit:number, page:number) : Promise<Location[] | null>;

	getLocationByIdentifier(locationId: string) : Promise<Location | null>;

	updateLocationById(locationId: string, locationFields: UpdateLocationRequest ): Promise<boolean>;

	removeLocationById(locationId: string) :  Promise<boolean>;

	updateLocationVisibility(locationIdentifier: string, visibility: string): Promise<boolean>;

}


