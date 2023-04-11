import express from 'express';
import { mock, instance, when, verify, anything, capture, anyString } from 'ts-mockito';
import { OrganizationsService } from '../services/organizations.service';
import { OrganizationsController } from './organizations.controller';


beforeEach(() => {
	jest.clearAllMocks();
});

let dummyOrganizations = [
	{ identifier: "1", name: "Organization 1" },
	{ identifier: "2", name: "Organization 2" },
	{ identifier: "3", name: "Organization 3" },
]

let newOrganization = { name: "Name", description: { de: "Beschreibung" }, createdAt: "", updatedAt: "" };

describe('listOrganizations is being tested', () => {
	test('organizations available organizations as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listOrganizations(res);

		verify(firstMockedResponse.status(200)).called();
	});

	test('organizations response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200);

		await controller.listOrganizations(res);

		expectResponseSendIsEqual(secondMockedResponse, {
			organizations: [
				{ identifier: '1', name: 'Organization 1' },
				{ identifier: '2', name: 'Organization 2' },
				{ identifier: '3', name: 'Organization 3' }
			]
		});

	})
});

describe('getOrganizationById is being tested', () => {
	test('organization available organizations as a document with code 200', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(200, {});

		await controller.getOrganizationById(res, "1");

		verify(firstMockedResponse.status(200)).called();
	});

	test('organization response is well structured', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(200,{},{ "organizationId": "1" });
		

		await controller.getOrganizationById(res, "1");

		expectResponseSendIsEqual(secondMockedResponse, {
			organization:
				{ identifier: '1', name: 'Organization 1' }
		});
	})
});

describe('createOrganization is being tested', () => {
	test('if an organization is successfully created, status 201 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newOrganization);

		await controller.createOrganization(res,newOrganization);

		verify(firstMockedResponse.status(201)).called();
	});

	test('if an organization is successfully created, a new ID is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(201, newOrganization);

		await controller.createOrganization( res, newOrganization);

		expectResponseSendIsEqual(secondMockedResponse, { "identifier": "NewId" });
	});

});

describe('patch is being tested', () => {
	test('if an organization is successfully patched, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse } = generateMockRequestResponse(204, newOrganization, { organizationId: 'existID'} );
		const data: Record<string, any> = newOrganization;
		data.organizationId = 'existID';

		await controller.patch(res, 'existID', newOrganization);

		verify(firstMockedResponse.status(204)).called();
	});


});


describe('removeOrganization is being tested', () => {
	test('if an organization is successfully removed, status 204 is returned', async () => {
		let controller = generateMockController();
		let { req, res, firstMockedResponse, secondMockedResponse } = generateMockRequestResponse(204, newOrganization, { organizationId: '1'});


		await controller.removeOrganization( res, "1");

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
	let mockedOrganizationsService: OrganizationsService = mock(OrganizationsService);
	when(mockedOrganizationsService.list(limit, page)).thenReturn(Promise.resolve(dummyOrganizations));
	when(mockedOrganizationsService.readById("1")).thenReturn(Promise.resolve(dummyOrganizations[0]));
	when(mockedOrganizationsService.readById("2")).thenReturn(Promise.resolve(dummyOrganizations[1]));
	when(mockedOrganizationsService.readById("3")).thenReturn(Promise.resolve(dummyOrganizations[2]));
	when(mockedOrganizationsService.create(anything())).thenReturn(Promise.resolve("NewId"));
	when(mockedOrganizationsService.patchById(anyString(),anything())).thenReturn(Promise.resolve(true));
	when(mockedOrganizationsService.deleteById("1")).thenReturn(Promise.resolve(true));
	let service: OrganizationsService = instance(mockedOrganizationsService);
	let controller = new OrganizationsController(service);
	return controller;
}

