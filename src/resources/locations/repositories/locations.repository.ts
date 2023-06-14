import debug from 'debug';
import { CreateLocation } from '../../../generated/models/CreateLocation.generated';
import { Location } from '../../../generated/models/Location.generated';
import { PatchLocation } from '../../../generated/models/PatchLocation.generated';
import { ExecutionResult } from '../../../generated/models/ExecutionResult.generated';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface LocationsRepository {
	searchDuplicates(location: Location): Promise<Location[]>;

	addLocation(createLocation: CreateLocationRequest): Promise<string>;

	getLocations(limit:number, page:number) : Promise<Location[] | null>;

	getLocationByIdentifier(locationId: string) : Promise<Location | null>;

	updateLocationById(locationId: string, locationFields: PatchLocation ): Promise<boolean>;

	removeLocationById(locationId: string) :  Promise<boolean>;

	updateLocationVisibility(locationIdentifier: string, visibility: string): Promise<ExecutionResult>;

}


