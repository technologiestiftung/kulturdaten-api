import {expect, jest, test} from '@jest/globals';
import { JWTUtil } from './JWTUtil';
import jwt from 'jsonwebtoken';


describe('JWTUtil is being tested', () => {
	test('...', async () => {
		const util = new JWTUtil();
		const token = util.createAuthToken("ID","1","geheim");
		const payload = jwt.verify(token, "geheim");
		console.log("Payload " + JSON.stringify(payload));
		
	});
});