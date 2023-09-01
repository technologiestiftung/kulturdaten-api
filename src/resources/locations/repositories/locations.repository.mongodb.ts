import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { LocationsRepository } from "./locations.repository";
import { generateLocationID } from "../../../utils/IDUtil";
import { Location } from "../../../generated/models/Location.generated";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { UpdateLocationRequest } from "../../../generated/models/UpdateLocationRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { generateLocationReference, getLocationReferenceProjection } from "../../../utils/ReferenceUtil";
import { Pagination } from "../../../common/parameters/Pagination";
import { MONGO_DB_DEFAULT_PROJECTION } from "../../../config/kulturdaten.config";


@Service()
export class MongoDBLocationsRepository implements LocationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<any[]> {
		const locations = await this.dbConnector.locations();

		let query = locations.find(filter || {}, { projection: projection ? {...projection, ...MONGO_DB_DEFAULT_PROJECTION} : MONGO_DB_DEFAULT_PROJECTION });
	
		if(pagination) {
			query = query
				.limit(pagination.pageSize)
				.skip((pagination.page - 1) * pagination.pageSize);
		}
		
		return query.toArray();
	}

	async searchLocations(filter?: Filter,  pagination?: Pagination): Promise<Location[]> {
		return this.get(filter, undefined, pagination);
	}

	async getLocations(pagination?: Pagination): Promise<Location[]> {
		return this.get(undefined, undefined, pagination);
	}

	async getLocationsAsReferences(pagination?: Pagination): Promise<Reference[]> {
		return this.get(undefined, getLocationReferenceProjection(), pagination);

	}
	
	async addLocation(createLocation: CreateLocationRequest): Promise<Reference | null> {
		const newLocation = createLocation as Location;
		newLocation.identifier = generateLocationID();

		const locations = await this.dbConnector.locations();
		const result = await locations.insertOne(newLocation);

		if (!result.acknowledged) {
			return null;
		}
		return generateLocationReference(newLocation);
	}


	async searchAllLocations(filter: Filter, projection? : object): Promise<Location[]> {
		return this.get(filter, projection, undefined);
	}

	async getLocationByIdentifier(locationId: string): Promise<Location | null> {
		const locations = await this.dbConnector.locations();
		return locations.findOne({ identifier: locationId }, { projection: { _id: 0 } });
	}

	async getLocationReferenceByIdentifier(locationId: string): Promise<Reference | null> {
		const locations = await this.dbConnector.locations();
		return locations.findOne({ identifier: locationId }, { projection: getLocationReferenceProjection() }) as Reference;
	}

	async updateLocationById(locationId: string, locationFields: UpdateLocationRequest): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const result = await locations.updateOne({ identifier: locationId }, { $set: locationFields });
		return result.modifiedCount === 1;
	}
	async removeLocationById(locationId: string): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const result = await locations.deleteOne({ identifier: locationId });
		return result.deletedCount === 1;
	}


	async updateOpeningStatus(identifier: string, openingStatus: Location['openingStatus']): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const filter = { identifier: identifier }; 
        const updateDocument = {
            $set: {
                "openingStatus": openingStatus
            },
        };
        const result = await locations.updateOne(filter, updateDocument);
		return result.modifiedCount === 1;
	}

	async updateStatus(identifier: string, status: Location['status']): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const filter = { identifier: identifier }; 
        const updateDocument = {
            $set: {
                "status": status
            },
        };
        const result = await locations.updateOne(filter, updateDocument);
		return result.modifiedCount === 1;
	}

	deleteLocationManager(identifier: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	setLocationManager(identifier: string, reference: Reference): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	async countLocations(filter?: Filter): Promise<number> {
		const locations = await this.dbConnector.locations();
		return locations.countDocuments(filter);
	}

}