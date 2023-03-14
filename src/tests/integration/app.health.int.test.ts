import express from 'express';
import {expect, jest, test} from '@jest/globals';
import { KdbAPI } from '../../KdbAPI';
import  request  from 'supertest';
import  { app } from '../../app';

let startApp = require('../../app');

beforeEach(() => {
	jest.clearAllMocks();
});

describe('healthCheck is being tested', () => {
	it('if server running, return status 200 and running message',  done => {
		request(app)
		.get('/')
		.set('Accept', 'text/html')
		.send()
			.then(response => {
				expect(response.status).toEqual(200);
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});
});

