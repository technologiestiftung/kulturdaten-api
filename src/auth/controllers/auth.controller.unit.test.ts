import express from 'express';
import { expect, jest, test } from '@jest/globals';
import crypto from 'crypto';
import { mock, instance, when, verify, anything, deepEqual, capture } from 'ts-mockito';
import { AuthController } from './auth.controller';

const env = process.env

beforeEach(() => {
    jest.clearAllMocks();
})

describe('createJWT is being tested', () => {
    test('accessToken and refreshToken are generated', async () => {
        crypto.randomBytes = (size: number) => {
            return Buffer.alloc(size, 1);
        };

        let { req, res, mockedResponse, mockedSecondResponse } = generateMocks({ userId: "ID" });

        let controller = new AuthController();
        await controller.createJWT(req, res);

        let refreshToken = '4SDr57bYL0NlulAYp40lKbl+5pLyC7stjF/fcGQEtq6zt/M0l3eL8SJ/9GN0IYUaQv+6Mdz2hMmlYlTo7r66HA==';

        verify(mockedResponse.status(201)).called();
        const [tokens] = capture(mockedSecondResponse.send).last();
        expect(tokens.refreshToken).toEqual(refreshToken);
        expect(tokens.accessToken).not.toBeUndefined();
    });
});

function generateMocks(body: object = {}, status: number = 201) {

    let mockedRequest: express.Request = mock<express.Request>();
    when(mockedRequest.body).thenReturn(body);
    let req: express.Request = instance(mockedRequest);
    let mockedResponse: express.Response = mock<express.Response>();
    let mockedSecondResponse: express.Response = mock<express.Response>();
    when(mockedResponse.status(anything())).thenReturn(instance(mockedSecondResponse));
    let res: express.Response = instance(mockedResponse);
    let mockedNext = jest.fn();
    return { req, res, mockedNext, mockedResponse, mockedRequest, mockedSecondResponse };
}
