import express from 'express';
import { expect, jest, test } from '@jest/globals';
import * as argon2 from 'argon2';
import { JwtMiddleware } from './jwt.middleware';
import { UsersService } from '../../users/services/users.service';
import { mock, instance, when, verify, anything, deepEqual, capture } from 'ts-mockito';
import { expectResponseSendIsEqual } from '../../utils/TestUtil';

beforeEach(() => {
	jest.clearAllMocks();
});

describe('verifyRefreshBodyField is being tested', () => {
    test('is refreshToken, next called', async () => {
		let body = {refreshToken: 'TOKEN'};
		let { req, res, mockedNext, mockedResponse, mockedRequest, mockedSecondResponse } 
			= generateMocks(body);

        let userService = instance(mock(UsersService));

        const auth = new JwtMiddleware(userService);
		await auth.verifyRefreshBodyField(req, res, mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
    });

	test('without refreshToken, status 400 and error is send', async () => {
		let { req, res, mockedNext, mockedResponse, mockedRequest, mockedSecondResponse } 
			= generateMocks();

        let userService = instance(mock(UsersService));

        const auth = new JwtMiddleware(userService);
		await auth.verifyRefreshBodyField(req, res, mockedNext);

		verify(mockedResponse.status(400)).called();
        expectResponseSendIsEqual(mockedSecondResponse, {  error: 'Missing required field: refreshToken' });
    });
});


function generateMocks(body: object = {}, status: number = 400) {
    let mockedRequest: express.Request = mock<express.Request>();
	when(mockedRequest.body).thenResolve
    let req: express.Request = instance(mockedRequest);
	req.body = body;
    let mockedResponse: express.Response = mock<express.Response>();
    let mockedSecondResponse: express.Response = mock<express.Response>();
    when(mockedResponse.status(status)).thenReturn(instance(mockedSecondResponse));
    let res: express.Response = instance(mockedResponse);
    let mockedNext = jest.fn();
    return { req, res, mockedNext, mockedResponse, mockedRequest, mockedSecondResponse };
}
