import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { LocationsRepository } from "./locations.repository";
import { generateID } from "../../utils/IDUtil";
import { CreateLocation } from "../../generated/models/CreateLocation.generated";
import { Location } from "../../generated/models/Location.generated";
import { PatchLocation } from "../../generated/models/PatchLocation.generated";
import { Db } from "mongodb";


@Service()
export class MongoDBLocationsRepository implements LocationsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }
	
	async searchDuplicates(location: Location): Promise<Location[]> {
		const locations = await this.dbConnector.locations();
		const query = { 
			'origin.originId': location.origin?.originId,
			'origin.name': location.origin?.name 
		};
		const response = await locations.find(query).toArray();
		return response;
	}

	async addLocation(createLocation: CreateLocation): Promise<string> {
		const newLocation = createLocation as Location;
		newLocation.identifier = generateID();

		const locations = await this.dbConnector.locations();
		await locations.insertOne(newLocation);
		return newLocation.identifier;
	}
	async getLocations(limit: number, page: number): Promise<Location[] | null> {
		const locations = await this.dbConnector.locations();
		return locations.find({}, { projection: { _id: 0 } }).toArray();
	}
	async getLocationByIdentifier(locationId: string): Promise<Location | null> {
		const locations = await this.dbConnector.locations();
		return locations.findOne({ identifier: locationId }, { projection: { _id: 0 } });
	}
	async updateLocationById(locationId: string, locationFields: PatchLocation): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const result = await locations.updateOne({ identifier: locationId }, { $set: locationFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeLocationById(locationId: string): Promise<boolean> {
		const locations = await this.dbConnector.locations();
		const result = await locations.deleteOne({ identifier: locationId });
		return Promise.resolve(result.deletedCount === 1);
	}

}