import { MongoDBOrganizersRepository, OrganizersRepository } from "../repositories/organizers.repository";
import { OrganizersService } from "./organizers.service";
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { Organizer } from "../repositories/organizer";
import { CreateOrganizerDto } from "../dtos/create.organizer.dto";


beforeEach(() => {
	jest.clearAllMocks();
});

let dummyOrganizers = [
	{ _id: "1", name: "Organizer 1" },
	{ _id: "2", name: "Organizer 2" },
	{ _id: "3", name: "Organizer 3" },
]

describe('create organizer is being tested', () => {
	test('create use addOrganizer', () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);
		let org: CreateOrganizerDto = { name: "New Organizer" };

		service.create(org);

		verify(mockedRepo.addOrganizer(org)).called();
	});

	test('if organizer created returns new OrganizerID', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		when(mockedRepo.addOrganizer(anything())).thenReturn(
			Promise.resolve('ID')
		);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);
		let org: CreateOrganizerDto = { name: "New Organizer" };

		let orgId: String | null = await service.create(org);

		expect(orgId).toBe('ID');
	});
});

describe('deleteById is being tested', () => {
	test('deleteById use removeOrganizerById', () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		service.deleteById("ID");

		verify(mockedRepo.removeOrganizerById("ID")).called();
	});

	test('if target removed returns removed message', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		when(mockedRepo.removeOrganizerById("ID")).thenReturn(
			Promise.resolve('ID removed')
		);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		let message: String | null = await service.deleteById("ID");

		expect(message).toBe('ID removed');
	});
});


describe('list organizer is being tested', () => {
	test('list use getOrganizers with limit 5 and page 0', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		service.list(5, 0);

		verify(mockedRepo.getOrganizers(5, 0)).called();
	});

	test('list use getOrganizers with limit 8 and page 2', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		service.list(8, 2);

		verify(mockedRepo.getOrganizers(8, 2)).called();
	});

	test('3 organizers available, all organizers listed with limit 5 and start 0, lists the 3 organizers', async () => {


		let mockedRepo = mock(MongoDBOrganizersRepository);
		when(mockedRepo.getOrganizers(5, 0)).thenReturn(
			Promise.resolve(dummyOrganizers)
		);
		let repo = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		let org: Organizer[] | null = await service.list(5, 0);

		expect(org).toStrictEqual(dummyOrganizers);
	});
});

describe('readById is being tested', () => {
	test('readById use getOrganizerById', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		service.readById("ID");

		verify(mockedRepo.getOrganizerById("ID")).called();
	});

	test('if organizer exist it will be returned', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		when(mockedRepo.getOrganizerById("1")).thenReturn(
			Promise.resolve(dummyOrganizers[0])
		);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		let org: Organizer | null = await service.readById("1");

		expect(org).toStrictEqual(dummyOrganizers[0]);
	});
});




describe('patchById is being testes', () => {
	test('patchById use updateOrganizerById', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		service.patchById("ID", {name: "neuer Name"});

		verify(mockedRepo.updateOrganizerById("ID", anything())).called();
	});

	test('if organizer patched returns updated message', async () => {
		let mockedRepo: OrganizersRepository = mock(MongoDBOrganizersRepository);
		when(mockedRepo.updateOrganizerById("ID", anything())).thenReturn(
			Promise.resolve({name: "neuer Name", description: "alte Beschreibung"})
		);
		let repo: OrganizersRepository = instance(mockedRepo);
		let service: OrganizersService = new OrganizersService(repo);

		let updatedOrganizer = await  service.patchById("ID", {name: "neuer Name"});;

		expect(updatedOrganizer).toEqual({name: "neuer Name", description: "alte Beschreibung"});
	});
	
});


