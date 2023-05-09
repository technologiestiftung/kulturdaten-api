import { DistrictDataService } from './district.data.harvester.service';
import { HarvesterClient } from '../../client/harvester.client';
import { Bezirksdaten } from '../model/district.data.types';

describe('test destrict data Service', () => {
	test('harvest data', async () => {
		const service = new DistrictDataService(new HarvesterClient<Bezirksdaten>);

		await service.harvestDistrictData();

		expect(true).toStrictEqual(true);
	});

});