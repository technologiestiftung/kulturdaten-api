import debug from 'debug';
import { Location } from '../../../generated/models/Location.generated';
import { CreateLocationRequest } from '../../../generated/models/CreateLocationRequest.generated';
import { UpdateLocationRequest } from '../../../generated/models/UpdateLocationRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { Filter } from '../../../generated/models/Filter.generated';


const log: debug.IDebugger = debug('app:locations-repository');

export interface LocationsRepository {

	getLocations(page:number, pageSize:number) : Promise<Location[] | null>;

	getLocationsAsReferences(page:number, pageSize:number) : Promise<Reference[] | null>;

	searchLocations(filter: Filter, page:number, pageSize:number, projection? : object): Promise<Location[]> ;

	searchAllLocations(filter: Filter, projection? : object): Promise<Location[]> ;

	countLocations(filter?: Filter): Promise<number>;

	deleteLocationManager(identifier: string): Promise<boolean>;

	updateOpeningStatus(identifier: string, openingStatus: Location['openingStatus']): Promise<boolean>;

	updateStatus(identifier: string, status: Location['status']): Promise<boolean>;


	setLocationManager(identifier: string, reference: Reference): Promise<boolean>;


	addLocation(createLocation: CreateLocationRequest): Promise<Reference | null>;


	getLocationByIdentifier(locationId: string) : Promise<Location | null>;

	getLocationReferenceByIdentifier(locationId: string): Promise<Reference | null>;

	updateLocationById(locationId: string, locationFields: UpdateLocationRequest ): Promise<boolean>;

	removeLocationById(locationId: string) :  Promise<boolean>;

}


