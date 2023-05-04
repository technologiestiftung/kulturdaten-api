import express from 'express';
import { mock, instance, when, verify, anything, capture, anyString } from 'ts-mockito';
import { LocationsService } from '../services/locations.service';
import { LocationsController } from './locations.controller';


beforeEach(() => {
	jest.clearAllMocks();
});

let dummyLocations = [
	{ identifier: "1", name: { de:  "Location 1" }},
	{ identifier: "2", name: { de:  "Location 2" } },
	{ identifier: "3", name: { de:  "Location 3" } },
]

let newLocation = { name: { de:  "Name" }, description: { de: "Beschreibung" }, createdAt: "", updatedAt: "" };

describe('listLocations is being tested', () => {
	test('locations available locations as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listLocations(res);

		verify(firstMockedResponse.status(200)).called();
	});

	test('locations response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listLocations(res);

		expectResponseSendIsEqual(secondMockedResponse, {
			locations: [
				{ identifier: '1', name: { de:  "Location 1" } },
				{ identifier: '2', name: { de:  "Location 2" } },
				{ identifier: '3', name: { de:  "Location 3" } }
			]
		});

	})
});

describe('getLocationById is being tested', () => {
	test('location available locations as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(200, {});

		await controller.getLocationById(res, "1");

		verify(firstMockedResponse.status(200)).called();
	});

	test('location response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200,{},{ "locationId": "1" });
		

		await controller.getLocationById(res, "1");

		expectResponseSendIsEqual(secondMockedResponse, {
			location:
				{ identifier: '1', name: { de:  "Location 1" } }
		});
	})
});

describe('createLocation is being tested', () => {
	test('if an location is successfully created, status 201 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newLocation);

		await controller.createLocation(res,newLocation);

		verify(firstMockedResponse.status(201)).called();
	});

	test('if an location is successfully created, a new ID is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newLocation);

		await controller.createLocation( res, newLocation);

		expectResponseSendIsEqual(secondMockedResponse, { "identifier": "NewId" });
	});

});

describe('patch is being tested', () => {
	test('if an location is successfully patched, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(204, newLocation, { locationId: 'existID'} );
		const data: Record<string, any> = newLocation;
		data.locationId = 'existID';

		await controller.patch(res, 'existID', newLocation);

		verify(firstMockedResponse.status(204)).called();
	});


});


describe('removeLocation is being tested', () => {
	test('if an location is successfully removed, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(204, newLocation, { locationId: '1'});


		await controller.removeLocation( res, "1");

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
	let mockedLocationsService: LocationsService = mock(LocationsService);
	when(mockedLocationsService.list(limit, page)).thenReturn(Promise.resolve(dummyLocations));
	when(mockedLocationsService.readById("1")).thenReturn(Promise.resolve(dummyLocations[0]));
	when(mockedLocationsService.readById("2")).thenReturn(Promise.resolve(dummyLocations[1]));
	when(mockedLocationsService.readById("3")).thenReturn(Promise.resolve(dummyLocations[2]));
	when(mockedLocationsService.create(anything())).thenReturn(Promise.resolve("NewId"));
	when(mockedLocationsService.patchById(anyString(),anything())).thenReturn(Promise.resolve(true));
	when(mockedLocationsService.deleteById("1")).thenReturn(Promise.resolve(true));
	let service: LocationsService = instance(mockedLocationsService);
	let controller = new LocationsController(service);
	return controller;
}

