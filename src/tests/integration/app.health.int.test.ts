import express from 'express';
import {expect, jest, test} from '@jest/globals';
import { KdbAPI } from '../../KdbAPI';
import  request  from 'supertest';


beforeEach(() => {
	jest.clearAllMocks();
});

describe('healthCheck is being tested', () => {
	test('if server running, return status 200 and running message', async () => {
		const kdbAPI = new KdbAPI(express(),'3000');
		kdbAPI.registerHealthCheck();
		const app = kdbAPI.app;

		const response = await request(app)
		.get('/')
		.set('Accept', 'text/html')

		expect(response.status).toEqual(200);
		expect(response.text).toContain("Server running at");
		expect(response.text).toContain(":3000");
	});
});