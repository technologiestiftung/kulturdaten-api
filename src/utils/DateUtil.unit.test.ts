import {expect, jest, test} from '@jest/globals';
import { DateUtil } from './DateUtil';


describe('DateUtil is being tested', () => {
	test('now returns ISO 8601 string with complete date plus h, m, s and a decimal fraction of a second', async () => {

        // YYYY-MM-DDThh:mm:ss.sZ
        const isoDateRegEx = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z/;
        const dateUtil = new DateUtil();
        
        const now = dateUtil.now(); 

        expect(now).toMatch(isoDateRegEx);
	});
});
