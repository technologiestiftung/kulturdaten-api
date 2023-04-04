import express from 'express';
import { mock, instance, when, verify, anything, capture, anyString } from 'ts-mockito';
import { OrganizersService } from '../services/organizers.service';
import { OrganizersController } from './organizers.controller';


beforeEach(() => {
	jest.clearAllMocks();
});

let dummyOrganizers = [
	{ id: "1", name: "Organizer 1" },
	{ id: "2", name: "Organizer 2" },
	{ id: "3", name: "Organizer 3" },
]

let newOrganizer = { name: "Name", description: "Beschreibung", createdAt: "", updatedAt: "" };

describe('listOrganizers is being tested', () => {
	test('organizers available organizers as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listOrganizers(res);

		verify(firstMockedResponse.status(200)).called();
	});

	test('organizers response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listOrganizers(res);

		expectResponseSendIsEqual(secondMockedResponse, {
			organizers: [
				{ id: '1', name: 'Organizer 1' },
				{ id: '2', name: 'Organizer 2' },
				{ id: '3', name: 'Organizer 3' }
			]
		});

	})
});

describe('getOrganizerById is being tested', () => {
	test('organizer available organizers as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(200, {});

		await controller.getOrganizerById(res, "1");

		verify(firstMockedResponse.status(200)).called();
	});

	test('organizer response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200,{},{ "organizerId": "1" });
		

		await controller.getOrganizerById(res, "1");

		expectResponseSendIsEqual(secondMockedResponse, {
			organizer:
				{ id: '1', name: 'Organizer 1' }
		});
	})
});

describe('createOrganizer is being tested', () => {
	test('if an organizer is successfully created, status 201 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newOrganizer);

		await controller.createOrganizer(res,newOrganizer);

		verify(firstMockedResponse.status(201)).called();
	});

	test('if an organizer is successfully created, a new ID is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newOrganizer);

		await controller.createOrganizer( res, newOrganizer);

		expectResponseSendIsEqual(secondMockedResponse, { "id": "NewId" });
	});

});

describe('patch is being tested', () => {
	test('if an organizer is successfully patched, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(204, newOrganizer, { organizerId: 'existID'} );
		const data: Record<string, any> = newOrganizer;
		data.organizerId = 'existID';

		await controller.patch(res, 'existID', newOrganizer);

		verify(firstMockedResponse.status(204)).called();
	});


});


describe('removeOrganizer is being tested', () => {
	test('if an organizer is successfully removed, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(204, newOrganizer, { organizerId: '1'});


		await controller.removeOrganizer( res, "1");

		verify(firstMockedResponse.status(204)).called();
	});

});



function expectResponseSendIsEqual(secondMockedResponse: express.Response, expected: object) {
	const [firstArg] = capture(secondMockedResponse.send).last();
	expect(firstArg).toEqual(expected);
}

function generateMockRequestResponse(status: number, body: Record<string, any> = {}, params: Record<string, any> = {}) {
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
	let mockedOrganizersService: OrganizersService = mock(OrganizersService);
	when(mockedOrganizersService.list(limit, page)).thenReturn(Promise.resolve(dummyOrganizers));
	when(mockedOrganizersService.readById("1")).thenReturn(Promise.resolve(dummyOrganizers[0]));
	when(mockedOrganizersService.readById("2")).thenReturn(Promise.resolve(dummyOrganizers[1]));
	when(mockedOrganizersService.readById("3")).thenReturn(Promise.resolve(dummyOrganizers[2]));
	when(mockedOrganizersService.create(anything())).thenReturn(Promise.resolve("NewId"));
	when(mockedOrganizersService.patchById(anyString(),anything())).thenReturn(Promise.resolve(dummyOrganizers[0]));
	when(mockedOrganizersService.deleteById("1")).thenReturn(Promise.resolve(true));
	let service: OrganizersService = instance(mockedOrganizersService);
	let controller = new OrganizersController(service);
	return controller;
}

