import { UsersRepository } from "../repositories/users.repository";
import { UsersService } from "./users.service";
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { CreateUserDto } from "../dtos/create.user.dto";
import { MongoDBUsersRepository } from "../repositories/users.repository.mobgodb"
import { User } from "../models/user.generated";

beforeEach(() => {
	jest.clearAllMocks();
});

let dummyUsers = [
	{ id: "1", email: "mail1@test.de", password: "HASH1" },
	{ id: "2", email: "mail2@test.de", password: "HASH2" },
	{ id: "3", email: "mail3@test.de", password: "HASH3" },
]

describe('create user is being tested', () => {
	test('create use addUser', () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);
		let org: CreateUserDto = { email: "mail-new@test.de", password: "HASH-NEW" };

		service.create(org);

		verify(mockedRepo.addUser(org)).called();
	});

	test('if user created returns new UserID', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		when(mockedRepo.addUser(anything())).thenReturn(
			Promise.resolve('ID')
		);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);
		let org: CreateUserDto = { email: "mail-new@test.de", password: "HASH-NEW" };

		let orgId: String | null = await service.create(org);

		expect(orgId).toBe('ID');
	});
});

describe('deleteById is being tested', () => {
	test('deleteById use removeUserById', () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		service.deleteById("ID");

		verify(mockedRepo.removeUserById("ID")).called();
	});

	test('if target removed returns removed message', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		when(mockedRepo.removeUserById("ID")).thenReturn(
			Promise.resolve(true)
		);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		let deleted: boolean = await service.deleteById("ID");

		expect(deleted).toBe(true);
	});
});


describe('list user is being tested', () => {
	test('list use getUsers with limit 5 and page 0', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		service.list(5, 0);

		verify(mockedRepo.getUsers(5, 0)).called();
	});

	test('list use getUsers with limit 8 and page 2', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		service.list(8, 2);

		verify(mockedRepo.getUsers(8, 2)).called();
	});

	test('3 users available, all users listed with limit 5 and start 0, lists the 3 users', async () => {


		let mockedRepo = mock(MongoDBUsersRepository);
		when(mockedRepo.getUsers(5, 0)).thenReturn(
			Promise.resolve(dummyUsers)
		);
		let repo = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		let org: User[] | null = await service.list(5, 0);

		expect(org).toStrictEqual(dummyUsers);
	});
});

describe('readById is being tested', () => {
	test('readById use getUserById', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		service.readById("ID");

		verify(mockedRepo.getUserById("ID")).called();
	});

	test('if user exist it will be returned', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		when(mockedRepo.getUserById("1")).thenReturn(
			Promise.resolve(dummyUsers[0])
		);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		let org: User | null = await service.readById("1");

		expect(org).toStrictEqual(dummyUsers[0]);
	});
});




describe('patchById is being testes', () => {
	test('patchById use updateUserById', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		service.patchById("ID", {email: "neueMail@beispiel.de"});

		verify(mockedRepo.updateUserById("ID", anything())).called();
	});

	test('if user patched returns updated message', async () => {
		let mockedRepo: UsersRepository = mock(MongoDBUsersRepository);
		when(mockedRepo.updateUserById("1", anything())).thenReturn(
			Promise.resolve({ id: "1", email: "neueMail@beispiel.de", password: "HASH1" })
		);
		let repo: UsersRepository = instance(mockedRepo);
		let service: UsersService = new UsersService(repo);

		let updatedUser = await  service.patchById("1", {email: "neueMail@beispiel.de"});;

		expect(updatedUser).toEqual({ id: "1", email: "neueMail@beispiel.de", password: "HASH1" });
	});
	
});

