import { LocationsRepository } from "../repositories/locations.repository";
import { LocationsService } from "./locations.service";
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { MongoDBLocationsRepository } from "../repositories/locations.repository.mobgodb";
import { CreateLocation } from "../../generated/models/CreateLocation.generated";
import { Location } from "../../generated/models/Location.generated";


beforeEach(() => {
	jest.clearAllMocks();
});

let dummyLocations = [
	{ identifier: "1", name: { de:  "Location 1" } },
	{ identifier: "2", name: { de:  "Location 2" } },
	{ identifier: "3", name: { de:  "Location 3" } },
]

describe('create location is being tested', () => {
	test('create use addLocation', () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);
		let org: CreateLocation = { name: { de:  "Location 1" }};

		service.create(org);

		verify(mockedRepo.addLocation(org)).called();
	});

	test('if location created returns new LocationID', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		when(mockedRepo.addLocation(anything())).thenReturn(
			Promise.resolve('ID')
		);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);
		let org: CreateLocation = { name: { de:  "Location 1" } };

		let orgId: String | null = await service.create(org);

		expect(orgId).toBe('ID');
	});
});

describe('deleteById is being tested', () => {
	test('deleteById use removeLocationById', () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		service.deleteById("ID");

		verify(mockedRepo.removeLocationById("ID")).called();
	});

	test('if target removed returns removed message', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		when(mockedRepo.removeLocationById("ID")).thenReturn(
			Promise.resolve(true)
		);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		let response: boolean = await service.deleteById("ID");

		expect(response).toBe(true);
	});
});


describe('list location is being tested', () => {
	test('list use getLocations with limit 5 and page 0', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		service.list(5, 0);

		verify(mockedRepo.getLocations(5, 0)).called();
	});

	test('list use getLocations with limit 8 and page 2', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		service.list(8, 2);

		verify(mockedRepo.getLocations(8, 2)).called();
	});

	test('3 locations available, all locations listed with limit 5 and start 0, lists the 3 locations', async () => {


		let mockedRepo = mock(MongoDBLocationsRepository);
		when(mockedRepo.getLocations(5, 0)).thenReturn(
			Promise.resolve(dummyLocations)
		);
		let repo = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		let org: Location[] | null = await service.list(5, 0);

		expect(org).toStrictEqual(dummyLocations);
	});
});

describe('readById is being tested', () => {
	test('readById use getLocationByIdentifier', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		service.readById("ID");

		verify(mockedRepo.getLocationByIdentifier("ID")).called();
	});

	test('if location exist it will be returned', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		when(mockedRepo.getLocationByIdentifier("1")).thenReturn(
			Promise.resolve(dummyLocations[0])
		);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		let org: Location | null = await service.readById("1");

		expect(org).toStrictEqual(dummyLocations[0]);
	});
});




describe('patchById is being testes', () => {
	test('patchById use updateLocationById', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		service.patchById("ID", {name: { de:  "new Name" }});

		verify(mockedRepo.updateLocationById("ID", anything())).called();
	});

	test('if location patched returns updated message', async () => {
		let mockedRepo: LocationsRepository = mock(MongoDBLocationsRepository);
		when(mockedRepo.updateLocationById("ID", anything())).thenReturn(
			Promise.resolve(true)
		);
		let repo: LocationsRepository = instance(mockedRepo);
		let service: LocationsService = new LocationsService(repo);

		let updatedLocation = await  service.patchById("ID", {name: { de:  "new Name" }});;

		expect(updatedLocation).toBe(true);
	});
	
});


