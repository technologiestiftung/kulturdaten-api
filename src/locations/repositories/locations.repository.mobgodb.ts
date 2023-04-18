import { Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { LocationsRepository } from "./locations.repository";
import { generateID } from "../../utils/IDUtil";
import { CreateLocation } from "../../generated/models/CreateLocation.generated";
import { Location } from "../../generated/models/Location.generated";
import { PatchLocation } from "../../generated/models/PatchLocation.generated";


@Service()
export class MongoDBLocationsRepository implements LocationsRepository {

	constructor(private db: MongoDBConnector) { }

	async addLocation(createLocation: CreateLocation): Promise<string> {
		const newLocation = createLocation as Location;
		newLocation.identifier = generateID();
		await this.db.locations().insertOne(newLocation);
		return newLocation.identifier;
	}
	getLocations(limit: number, page: number): Promise<Location[] | null> {
		return this.db.locations().find({}, { projection: { _id: 0 } }).toArray();
	}
	getLocationByIdentifier(locationId: string): Promise<Location | null> {
		return this.db.locations().findOne({ identifier: locationId }, { projection: { _id: 0 } });
	}
	async updateLocationById(locationId: string, locationFields: PatchLocation): Promise<boolean> {
		const result = await this.db.locations().updateOne({ identifier: locationId }, { $set: locationFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeLocationById(locationId: string): Promise<boolean> {
		const result = await this.db.locations().deleteOne({ identifier: locationId });
		return Promise.resolve(result.deletedCount === 1);
	}

}