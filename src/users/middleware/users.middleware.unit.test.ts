import express from 'express';
import {expect, jest, test} from '@jest/globals';
import { mock, instance, when, verify, anything, capture } from 'ts-mockito';
import { UsersMiddleware } from './users.middleware';
import { UsersService } from '../services/users.service';
import { expectResponseSendIsEqual } from '../../utils/TestUtil';

beforeEach(() => {
	jest.clearAllMocks();
});


describe('extractUserId is being tested', () => {
	test('next is called', async () => {
        
        let { req, res, mockedNext, usersService } = generateMocks();

        let middleware = new UsersMiddleware(usersService);
        await middleware.extractUserId(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('body has userId', async () => {
        let body = { id : "USER-ID"}
        let { req, res, mockedNext, usersService } = generateMocks();

        let middleware = new UsersMiddleware(usersService);
        await middleware.extractUserId(req,res,mockedNext);

        expect(body.id).toBe("USER-ID");
	});
});


describe('validateRequiredUserBodyFields is being tested', () => {
	test('if email and password exist next is called', async () => {
        
        let { req, res, mockedNext,  usersService } = generateMocks({ id:"USER-ID", email:"valide@mail.de", password: "geheim"});

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateRequiredUserBodyFields(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if email dont exist status is 400', async () => {
        let { req, res, mockedNext, usersService, firstMockedResponse } = generateMocks({ id:"USER-ID", password: "geheim"}, 400);

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateRequiredUserBodyFields(req,res,mockedNext);
       
		verify(firstMockedResponse.status(400)).called();
	});

    test('if password dont exist status is 400', async () => {
        let { req, res, mockedNext, usersService, firstMockedResponse } = generateMocks({ id:"USER-ID", email:"valide@mail.de"}, 400);

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateRequiredUserBodyFields(req,res,mockedNext);
       
		verify(firstMockedResponse.status(400)).called();
	});

    test('if password dont exist status message is an error', async () => {
        let { req, res, mockedNext, usersService, secondMockedResponse } = generateMocks({ id:"USER-ID", email:"valide@mail.de"}, 400);

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateRequiredUserBodyFields(req,res,mockedNext);
       
        expectResponseSendIsEqual(secondMockedResponse, { error: `Missing required fields email and password` });
	});
});

describe('validateSameEmailDoesntExist is being tested', () => {
	test('if email not exist next is called', async () => {
        
        let { req, res, mockedNext,  usersService } = generateMocks({ email:"new@mail.de"});

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateSameEmailDoesntExist(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if email exist status is 400', async () => {
        let { req, res, mockedNext, usersService, firstMockedResponse } = generateMocks({ email:"existing@mail.de"}, 400);

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateSameEmailDoesntExist(req,res,mockedNext);
       
		verify(firstMockedResponse.status(400)).called();
	});

    test('if email exist status message is an error', async () => {
        let { req, res, mockedNext, usersService, secondMockedResponse } = generateMocks({ email:"existing@mail.de"}, 400);

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateSameEmailDoesntExist(req,res,mockedNext);
       
        expectResponseSendIsEqual(secondMockedResponse, { error: `User email already exists` });

	});
});

describe('validateUserExists is being tested', () => {
	test('if user exist next is called', async () => {
        
        let { req, res, mockedNext, usersService, firstMockedResponse } = generateMocks({ email:"existing@mail.de"}, 404, { userId: "existingID" });

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateUserExists(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if user not exist status is 404', async () => {
        let { req, res, mockedNext, usersService, firstMockedResponse } = generateMocks({ email:"existing@mail.de"}, 404, { userId: "USER-ID" });

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateUserExists(req,res,mockedNext);
       
		verify(firstMockedResponse.status(404)).called();
	});

    test('if user not exist  status message is an error', async () => {
        let { req, res, mockedNext, usersService, secondMockedResponse } = generateMocks({ email:"existing@mail.de"}, 404, { userId: "USER-ID" });

        let middleware = new UsersMiddleware(usersService);
        await middleware.validateUserExists(req,res,mockedNext);
       
        expectResponseSendIsEqual(secondMockedResponse, { error: `User ${req.params.userId} not found` });

	});
});

describe('userCantChangePermission is being tested', () => {
	test('if body permissionFlags equals user permission Flags next is called', async () => {
        
        let { req, res, mockedNext, usersService } = generateMocks({ email:"existing@mail.de", permissionFlags: 1}, 404, { userId: "existingID" });

        let middleware = new UsersMiddleware(usersService);
        await middleware.userCantChangePermission(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if body permissionFlags not equals user permission Flags status is 400', async () => {
        
        let { req, res, mockedNext, usersService, firstMockedResponse } = generateMocks({ email:"existing@mail.de", permissionFlags: 2}, 400, { userId: "existingID" });

        let middleware = new UsersMiddleware(usersService);
        await middleware.userCantChangePermission(req,res,mockedNext);

		verify(firstMockedResponse.status(400)).called();
	});


    test('if body permissionFlags not equals user permission Flags status message is an error', async () => {
        
        let { req, res, mockedNext, usersService, secondMockedResponse } = generateMocks({ email:"existing@mail.de", permissionFlags: 2}, 400, { userId: "existingID" });

        let middleware = new UsersMiddleware(usersService);
        await middleware.userCantChangePermission(req,res,mockedNext);

        expectResponseSendIsEqual(secondMockedResponse, { error: `User cannot change permission flags` });
	});

});

function generateMocks(  body: object = {}, status: number = 200, params = { userId: "USER-ID" }, locals = { user: { permissionFlags: 1}}) {
    let mockedRequest: express.Request = mock<express.Request>();
    when(mockedRequest.body).thenReturn(body);
    when(mockedRequest.params).thenReturn(params);
    let req: express.Request = instance(mockedRequest);
	let firstMockedResponse: express.Response = mock();
    when(firstMockedResponse.locals).thenReturn(locals);
	let secondMockedResponse: express.Response = mock();
	when(firstMockedResponse.status(status)).thenReturn(instance(secondMockedResponse));
	let res: express.Response = instance(firstMockedResponse);
    let mockedNext = jest.fn();
    let mockedUsersService: UsersService = mock(UsersService);
    when(mockedUsersService.getUserByEmail("existing@mail.de")).thenReturn(Promise.resolve({id: "existingID", email: "existing@mail.de"}));
    when(mockedUsersService.readById("existingID")).thenReturn(Promise.resolve({id: "existingID", email: "existing@mail.de"}));
    let usersService = instance(mockedUsersService);
    return { req, res, mockedNext, usersService,  firstMockedResponse, secondMockedResponse};
}