import { Inject, Service } from "typedi";
import { Location } from "../../../generated/models/Location.generated";
import { LocationsRepository } from "../../../resources/locations/repositories/LocationsRepository";
import { MongoDBFilterFactory } from "../../../common/filter/FilterFactory";

@Service()
export class CoordinatesToLocationsService {
	constructor(@Inject("LocationsRepository") public locationsRepository: LocationsRepository) {}

	async enrichData(locationsIDs: string[]): Promise<string[]> {
		const filterFactory = new MongoDBFilterFactory();
		let locationsToBeEnriched: Location[] = [];
		if (locationsIDs.length > 0) {
			locationsToBeEnriched = await this.locationsRepository.getLocations(
				undefined,
				filterFactory.createAnyMatchFilter("identifier", locationsIDs),
			);
		} else {
			locationsToBeEnriched = await this.locationsRepository.getLocations(
				undefined,
				filterFactory.createNotExistsFilter("coordinates"),
			);
		}

		return locationsToBeEnriched.map((location) => location.identifier);
	}
}
