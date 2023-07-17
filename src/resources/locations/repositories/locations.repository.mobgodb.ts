import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { LocationsRepository } from "./locations.repository";
import { generateID } from "../../../utils/IDUtil";
import { Location } from "../../../generated/models/Location.generated";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { UpdateLocationRequest } from "../../../generated/models/UpdateLocationRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Filter } from "../../../generated/models/Filter.generated";


@Service()
export class MongoDBLocationsRepository implements LocationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	
	async addLocation(createLocation: CreateLocationRequest): Promise<Reference | null> {
		const newLocation = createLocation as Location;
		newLocation.identifier = generateID();

		const locations = await this.dbConnector.locations();
		const result = await locations.insertOne(newLocation);

		if(!result.acknowledged){
			return Promise.resolve(null);
		}
		return {
			referenceType: 'type.Location',
			referenceId: newLocation.identifier,
			referenceLabel: newLocation.displayName? newLocation.displayName : newLocation.title
		};
	}
	async getLocations(limit: number, page: number): Promise<Location[] | null> {
		const locations = await this.dbConnector.locations();
		return locations.find({}, { projection: { _id: 0 } }).toArray();
	}


	async searchLocations(filter: Filter): Promise<Location[]> {
		const locations = await this.dbConnector.locations();
		return Promise.resolve(locations.find(filter, { projection: { _id: 0 } }).toArray());
	}

	async getLocationByIdentifier(locationId: string): Promise<Location | null> {
		const locations = await this.dbConnector.locations();
		return locations.findOne({ identifier: locationId }, { projection: { _id: 0 } });
	}
	async updateLocationById(locationId: string, locationFields: UpdateLocationRequest): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const result = await locations.updateOne({ identifier: locationId }, { $set: locationFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeLocationById(locationId: string): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const result = await locations.deleteOne({ identifier: locationId });
		return Promise.resolve(result.deletedCount === 1);
	}


	async updateOpeningStatus(identifier: string, openingStatus: Location['openingStatus']): Promise<boolean>{
		const locations = await this.dbConnector.locations();
		const filter = { identifier: identifier }; 
        const updateDocument = {
            $set: {
                "openingStatus": openingStatus
            },
        };
        const result = await locations.updateOne(filter, updateDocument);
		return Promise.resolve(result.modifiedCount === 1);
	}

	async updateStatus(identifier: string, status: Location['status']): Promise<boolean>{
		const locations = await this.dbConnector.locations();
		const filter = { identifier: identifier }; 
        const updateDocument = {
            $set: {
                "status": status
            },
        };
        const result = await locations.updateOne(filter, updateDocument);
		return Promise.resolve(result.modifiedCount === 1);
	}

	deleteLocationManager(identifier: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

	setLocationManager(identifier: string, reference: Reference): Promise<boolean> {
		throw new Error("Method not implemented.");
	}

}