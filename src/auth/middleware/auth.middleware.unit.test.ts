import express from 'express';
import { expect, jest, test } from '@jest/globals';
import * as argon2 from 'argon2';
import { AuthMiddleware } from './auth.middleware';
import { UsersService } from '../../users/services/users.service';
import { mock, instance, when, verify, anything, deepEqual, capture } from 'ts-mockito';
import { expectResponseSendIsEqual } from '../../utils/TestUtil';

beforeEach(() => {
	jest.clearAllMocks();
});


describe('verifyUserPassword is being tested and body have permissionFlags', () => {
    test('is password correct, next called', async () => {
        let mail = "user@gmx.de";
        let password = "geh3im";
        let passwordHash = await argon2.hash(password);
        let user = {
			_id: "USERID",
            password: passwordHash,
            email: mail,
            permissionFlags: 1
        }
		let body = {email: mail, password: password};
		let { req, res, mockedNext } 
			= generateMocks(body);

        let mockedUserService = mock(UsersService);
        when(mockedUserService.getUserByEmailWithPassword(mail)).thenResolve(user);
        let userService = instance(mockedUserService);

        const auth = new AuthMiddleware(userService);
		await auth.verifyUserPassword(req, res, mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
		expect(req.body).toHaveProperty('permissionFlags');
    });

	test('is password not correct, status 400 and error', async () => {
        let mail = "user@gmx.de";
        let password = "geh3im";
        let passwordHash = await argon2.hash(password);
        let user = {
			_id: "USERID",
            password: passwordHash,
            email: mail,
            permissionFlags: 1
        }
		let body = {email: mail, password: "FalschesPW"};
		let { req, res, mockedNext, mockedResponse, mockedRequest, mockedSecondResponse } 
			= generateMocks(body);

        let mockedUserService = mock(UsersService);
        when(mockedUserService.getUserByEmailWithPassword(mail)).thenResolve(user);
        let userService = instance(mockedUserService);

        const auth = new AuthMiddleware(userService);
		await auth.verifyUserPassword(req, res, mockedNext);

		verify(mockedResponse.status(400)).called();
        expectResponseSendIsEqual(mockedSecondResponse, { error: 'Invalid email and/or password' });

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
