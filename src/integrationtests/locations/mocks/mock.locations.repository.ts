import { fakeCore } from "../../../generated/faker/faker.Core.generated";
import { fakeLocation, fakeLocations } from "../../../generated/faker/faker.Location.generated";
import { fakeReference } from "../../../generated/faker/faker.Reference.generated";
import { CreateLocation } from "../../../generated/models/CreateLocation.generated";
import { Location } from "../../../generated/models/Location.generated";
import { PatchLocation } from "../../../generated/models/PatchLocation.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { LocationsRepository } from "../../../locations/repositories/locations.repository";


export class MockLocationsRepository implements LocationsRepository {

	public dummyLocations: Location[] = [];

	constructor(useExamples: boolean, ...specifiedPropertiesForLocations: object[]){
		this.dummyLocations = fakeLocations(useExamples,...specifiedPropertiesForLocations);
	}
	searchDuplicates(location: Location): Promise<Location[]> {
		throw new Error("Method not implemented.");
	}

	public reset() {
		this.dummyLocations = [];
	}

	public addDummyOrganization(useExamples: boolean, specifiedPropertiesForOrganization: object = {}) {
		const l =  fakeLocation(useExamples,specifiedPropertiesForOrganization);
		this.dummyLocations.push(l);
		return l.identifier;
	}


	addLocation(createLocation: CreateLocation): Promise<string> {
		let newLocation : Location =  { identifier: "234234234", ...createLocation}
		newLocation = this.addCoreData(newLocation);
		newLocation = this.resolveReferences(newLocation);
		this.dummyLocations.push(newLocation);
		return Promise.resolve(newLocation.identifier ? newLocation.identifier : "");
	}
	
	private resolveReferences(newLocation: Location) {
		let newReferences: Reference = {};
		if (newLocation.managedBy) {
			newReferences.managedBy = fakeReference(false, { identifier: newLocation.identifier });
		}
		newLocation = { ...newLocation, ...newReferences };
		return newLocation;
	}

	private addCoreData(newLocation: Location) {
		let newCore = fakeCore(false, {});
		newLocation = { ...newLocation, ...newCore };
		return newLocation;
	}

	getLocations(limit: number, page: number): Promise<Location[] | null> {
		return Promise.resolve(this.dummyLocations);
	}
	getLocationByIdentifier(locationId: string): Promise<Location | null> {
		const location = this.dummyLocations.find(location => location.identifier === locationId);
		return Promise.resolve(location? location : null);
	}
	updateLocationById(locationId: string, locationFields: PatchLocation): Promise<boolean> {
		let location = this.dummyLocations.find(location => location.identifier === locationId);
		if(location){
			Object.assign(location, locationFields);
			return Promise.resolve(true);
		} else {
			return Promise.resolve(false);
		}
	}	
	removeLocationById(locationId: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}



}