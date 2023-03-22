import express from 'express';
import {expect, jest, test} from '@jest/globals';
import { mock, instance, when, verify, anything, capture } from 'ts-mockito';
import { CommonPermissionMiddleware } from './common.permission.middleware';
import { PermissionFlag } from './common.permissionflag.enum';
import { User } from '../../users/repositories/user';

beforeEach(() => {
	jest.clearAllMocks();
});

describe('permissionFlagRequired is being tested', () => {
	test('if the permissions are equal, next is called', async () => {
        let { req, res, mockedNext, mockedResponse } = generateMocks(PermissionFlag.REGISTERED_USER);

        const middleware = new CommonPermissionMiddleware();

        await middleware.permissionFlagRequired(req,res,mockedNext, PermissionFlag.REGISTERED_USER);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if the permission is included, next is called', async () => {
        let { req, res, mockedNext, mockedResponse } = generateMocks(PermissionFlag.PUBLISH_VENUES+ PermissionFlag.REGISTERED_USER);

        const middleware = new CommonPermissionMiddleware();

        await middleware.permissionFlagRequired(req,res,mockedNext, PermissionFlag.REGISTERED_USER);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if all_permissions, next is called', async () => {
        let { req, res, mockedNext, mockedResponse } = generateMocks(PermissionFlag.ALL_PERMISSIONS);

        const middleware = new CommonPermissionMiddleware();

        await middleware.permissionFlagRequired(req,res,mockedNext, PermissionFlag.REGISTERED_USER);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});


    test('if the permission is not included, status is 403', async () => {
        let { req, res, mockedNext, mockedResponse } = generateMocks(PermissionFlag.REGISTERED_USER);

        const middleware = new CommonPermissionMiddleware();

        await middleware.permissionFlagRequired(req,res,mockedNext, PermissionFlag.ORGANIZER_ADMIN_PERMISSION);

       
		verify(mockedResponse.status(403)).called();
	});

    test('if no permission flag, status is 403', async () => {
        let { req, res, mockedNext, mockedResponse } = generateMocks(PermissionFlag.REGISTERED_USER);

        const middleware = new CommonPermissionMiddleware();

        await middleware.permissionFlagRequired(req,res,mockedNext, PermissionFlag.ORGANIZER_ADMIN_PERMISSION);

       
		verify(mockedResponse.status(403)).called();
	});
});

describe('onlySameUserOrAdminCanDoThisAction is being tested', () => {
	test('if the userId are equal, next is called', async () => {
        let { req, res, mockedNext, mockedResponse } = 
            generateMocks(PermissionFlag.REGISTERED_USER, "USER_ID", "USER_ID");

        const middleware = new CommonPermissionMiddleware();

        await middleware.onlySameUserOrAdminCanDoThisAction(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
	});

    test('if the userId not equal, status is 403', async () => {
        let { req, res, mockedNext, mockedResponse } = 
            generateMocks(PermissionFlag.REGISTERED_USER, "USER_ID", "OTHER_USER_ID");

        const middleware = new CommonPermissionMiddleware();
        let spy =jest.spyOn(middleware, 'permissionFlagRequired');

        await middleware.onlySameUserOrAdminCanDoThisAction(req,res,mockedNext);

		verify(mockedResponse.status(403)).called();
    });

    test('if the userId but permissions is admin , next is called', async () => {
        let { req, res, mockedNext, mockedResponse } = 
            generateMocks(PermissionFlag.ADMIN_PERMISSION, "USER_ID", "OTHER_USER_ID");

        const middleware = new CommonPermissionMiddleware();
        let spy =jest.spyOn(middleware, 'permissionFlagRequired');

        await middleware.onlySameUserOrAdminCanDoThisAction(req,res,mockedNext);

        expect(mockedNext.mock.calls).toHaveLength(1);
    });
});


function generateMocks( flags:number = 0, userIdParams:string = "", userIdLocals:string = "1" ) {
    const user = {permissionFlags : flags, _id : userIdLocals} as User;
    const params = { userId: userIdParams};

    let mockedRequest: express.Request = mock<express.Request>();
    when(mockedRequest.user).thenReturn(user)
    when(mockedRequest.params).thenReturn(params);
    let req: express.Request = instance(mockedRequest);
    let mockedResponse: express.Response = mock<express.Response>();
    let res: express.Response = instance(mockedResponse);
    let mockedNext = jest.fn();
    return { req, res, mockedNext, mockedResponse,  mockedRequest};
}
