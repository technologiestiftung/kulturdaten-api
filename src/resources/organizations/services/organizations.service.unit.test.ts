import { OrganizationsRepository } from "../repositories/organizations.repository";
import { OrganizationsService } from "./organizations.service";
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { MongoDBOrganizationsRepository } from "../repositories/organizations.repository.mobgodb";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Organization } from "../../../generated/models/Organization.generated";

/*
beforeEach(() => {
	jest.clearAllMocks();
});

let dummyOrganizations = [
	{ identifier: "1", title: { 'de' : "1 Organization"} },
	{ identifier: "2", title: { 'de' : "2 Organization"} },
	{ identifier: "3", title: { 'de' : "3 Organization"} },
]

describe('create organization is being tested', () => {
	test('create use addOrganization', () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);
		let org: CreateOrganizationRequest = { title: { 'de' : "New Organization"} };

		service.create(org);

		verify(mockedRepo.addOrganization(org)).called();
	});

	test('if organization created returns new OrganizationID', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		when(mockedRepo.addOrganization(anything())).thenReturn(
			Promise.resolve('ID')
		);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);
		let org: CreateOrganizationRequest = { title: { 'de' : "New Organization"} };

		let orgId: String | null = await service.create(org);

		expect(orgId).toBe('ID');
	});
});

describe('deleteById is being tested', () => {
	test('deleteById use removeOrganizationById', () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		service.deleteById("ID");

		verify(mockedRepo.removeOrganizationById("ID")).called();
	});

	test('if target removed returns removed message', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		when(mockedRepo.removeOrganizationById("ID")).thenReturn(
			Promise.resolve(true)
		);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		let response: boolean = await service.deleteById("ID");

		expect(response).toBe(true);
	});
});


describe('list organization is being tested', () => {
	test('list use getOrganizations with limit 5 and page 0', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		service.list(5, 0);

		verify(mockedRepo.getOrganizations(5, 0)).called();
	});

	test('list use getOrganizations with limit 8 and page 2', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		service.list(8, 2);

		verify(mockedRepo.getOrganizations(8, 2)).called();
	});

	test('3 organizations available, all organizations listed with limit 5 and start 0, lists the 3 organizations', async () => {


		let mockedRepo = mock(MongoDBOrganizationsRepository);
		when(mockedRepo.getOrganizations(5, 0)).thenReturn(
			Promise.resolve(dummyOrganizations)
		);
		let repo = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		let org: Organization[] | null = await service.list(5, 0);

		expect(org).toStrictEqual(dummyOrganizations);
	});
});

describe('readById is being tested', () => {
	test('readById use getOrganizationByIdentifier', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		service.readById("ID");

		verify(mockedRepo.getOrganizationByIdentifier("ID")).called();
	});

	test('if organization exist it will be returned', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		when(mockedRepo.getOrganizationByIdentifier("1")).thenReturn(
			Promise.resolve(dummyOrganizations[0])
		);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		let org: Organization | null = await service.readById("1");

		expect(org).toStrictEqual(dummyOrganizations[0]);
	});
});




describe('patchById is being testes', () => {
	test('patchById use updateOrganizationById', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		service.patchById("ID",{ title: { 'de' : "New Name"}});

		verify(mockedRepo.updateOrganizationById("ID", anything())).called();
	});

	test('if organization patched returns updated message', async () => {
		let mockedRepo: OrganizationsRepository = mock(MongoDBOrganizationsRepository);
		when(mockedRepo.updateOrganizationById("ID", anything())).thenReturn(
			Promise.resolve(true)
		);
		let repo: OrganizationsRepository = instance(mockedRepo);
		let service: OrganizationsService = new OrganizationsService(repo);

		let updatedOrganization = await  service.patchById("ID", { title: { 'de' : "New Name"}});;

		expect(updatedOrganization).toBe(true);
	});
	
});


*/