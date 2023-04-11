import express from 'express';
import { mock, instance, when, verify, anything, capture } from 'ts-mockito';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

beforeEach(() => {
	jest.clearAllMocks();
});

let dummyUsersRepo = [
    {	identifier: "1",
        email: "1@mail.de",
        password: "geheim1",
        firstName: "Nutzer",
        lastName: "Datenschauer",
        permissionFlags: 1},
        {	identifier: "2",
        email: "2@mail.de",
        password: "geheim2",
        firstName: "Nutzer",
        lastName: "Eventschreiber",
        permissionFlags: 127},
        {	identifier: "3",
        email: "3@mail.de",
        password: "geheim3",
        firstName: "Nutzer",
        lastName: "Organization Admin",
        permissionFlags: 511}, 
        {	identifier: "4",
        email: "4@mail.de",
        password: "geheim4",
        firstName: "Nutzer",
        lastName: "TSB Admin",
        permissionFlags: 8192}
]

let newUser = { email: "neu@mail.de",password: "geheimNEU", createdAt: undefined, updatedAt: undefined };

describe('listUsers is being tested', () => {
	test('users available users as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listUsers(res);

		verify(firstMockedResponse.status(200)).called();
	});

	test('users response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listUsers(res);

		expectResponseSendIsEqual(secondMockedResponse, {
			users: dummyUsersRepo
		});

	})
});

describe('getUserById is being tested', () => {
	test('user available users as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200,{}, { "userId": "1" });

		await controller.getUserById(res, "1");

		verify(firstMockedResponse.status(200)).called();
	});

	test('user response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200,{},  { "userId": "1" });

		await controller.getUserById(res, "1");

		expectResponseSendIsEqual(secondMockedResponse, {"user": dummyUsersRepo[0]});
	})
});

describe('createUser is being tested', () => {
	test('if an user is successfully created, status 201 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newUser);

		await controller.createUser(res, newUser);

		verify(firstMockedResponse.status(201)).called();
	});

	test('if an user is successfully created, a new ID is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newUser);

		await controller.createUser(res, newUser);

		expectResponseSendIsEqual(secondMockedResponse, { "identifier": "NewId" });
	});
});

describe('patch is being tested', () => {
	test('if an user is successfully patched, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(204, newUser, { userId: '1'});

		await controller.patch(res, "1", newUser);

		verify(firstMockedResponse.status(204)).called();
	});

});

describe('removeUser is being tested', () => {
	test('if an user is successfully removed, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(204, newUser, { userId: '1'});

		await controller.removeUser(res, "1");

		verify(firstMockedResponse.status(204)).called();
	});

});



function expectResponseSendIsEqual(secondMockedResponse: express.Response, expected: object) {
	const [firstArg] = capture(secondMockedResponse.send).last();
	expect(firstArg).toEqual(expected);
}

function generateMockRequestResponse(status: number, body: object = {}, params: Record<string, any> = {}) {
	let mockedRequest: express.Request = mock<express.Request>();
	when(mockedRequest.body).thenReturn(body);
	when(mockedRequest.params).thenReturn(params);
	let req: express.Request = instance(mockedRequest);
	let firstMockedResponse: express.Response = mock();
	let secondMockedResponse: express.Response = mock();
	when(firstMockedResponse.status(status)).thenReturn(instance(secondMockedResponse));
	let res: express.Response = instance(firstMockedResponse);
	return { req, res, firstMockedResponse: firstMockedResponse, secondMockedResponse: secondMockedResponse };
}

function generateMockController(limit: number = 100, page: number = 0) {
	let mockedUsersService: UsersService = mock(UsersService);
	when(mockedUsersService.list(limit, page)).thenReturn(Promise.resolve(dummyUsersRepo));
	when(mockedUsersService.readById("1")).thenReturn(Promise.resolve(dummyUsersRepo[0]));
	when(mockedUsersService.readById("2")).thenReturn(Promise.resolve(dummyUsersRepo[1]));
	when(mockedUsersService.readById("3")).thenReturn(Promise.resolve(dummyUsersRepo[2]));
	when(mockedUsersService.create(anything())).thenReturn(Promise.resolve("NewId"));
	when(mockedUsersService.patchById("1", anything())).thenReturn(Promise.resolve(true));
	when(mockedUsersService.deleteById("1")).thenReturn(Promise.resolve(true));
	let service: UsersService = instance(mockedUsersService);
	let controller = new UsersController(service);
	return controller;
}

