import express from 'express';
import {expect, jest, test} from '@jest/globals';
import { mock, instance, when, verify, anything, capture } from 'ts-mockito';
import { OrganizersMiddleware } from './organizers.middleware';

beforeEach(() => {
	jest.clearAllMocks();
});


describe('extractOrganizerId is being tested', () => {
	test('next is called', async () => {
        
        let { req, res, mockedNext, body } = generateMocks();

        let middleware = new OrganizersMiddleware();
        await middleware.extractOrganizerId(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('body has organizerId', async () => {
        let { req, res, mockedNext, body } = generateMocks();

        let middleware = new OrganizersMiddleware();
        await middleware.extractOrganizerId(req,res,mockedNext);

        expect(body.id).toBe("ORGANIZER-ID");
	});
});

function generateMocks() {
    let body = { id: undefined };
    let params = { organizerId: "ORGANIZER-ID" };
    let mockedRequest: express.Request = mock<express.Request>();
    when(mockedRequest.body).thenReturn(body);
    when(mockedRequest.params).thenReturn(params);
    let req: express.Request = instance(mockedRequest);
    let mockedResponse: express.Response = mock<express.Response>();
    let res: express.Response = instance(mockedResponse);
    let mockedNext = jest.fn();
    return { req, res, mockedNext, body };
}
