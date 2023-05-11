import debug from 'debug';
import { CreateLocation } from '../../generated/models/CreateLocation.generated';
import { Location } from '../../generated/models/Location.generated';
import { PatchLocation } from '../../generated/models/PatchLocation.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface LocationsRepository {
	searchDuplicates(location: Location): Promise<Location[]>;

	addLocation(createLocation: CreateLocation): Promise<string>;

	getLocations(limit:number, page:number) : Promise<Location[] | null>;

	getLocationByIdentifier(locationId: string) : Promise<Location | null>;

	updateLocationById(locationId: string, locationFields: PatchLocation ): Promise<boolean>;

	removeLocationById(locationId: string) :  Promise<boolean>;
}


