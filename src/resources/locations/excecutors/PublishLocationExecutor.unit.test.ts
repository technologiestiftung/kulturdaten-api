
import { mock, instance, when, verify, anything } from 'ts-mockito';
import { PublishLocationExecutor } from './PublishLocationExecutor';
import { LocationsService } from '../services/locations.service';
import { User } from '../../../generated/models/User.generated';
import { PermissionFlag } from '../../auth/middleware/auth.permissionflag.enum';

beforeEach(() => {
	jest.clearAllMocks();
});

describe('publish location command is being tested', () => {
	test('the right command id is being returned', () => {

		const executor = new PublishLocationExecutor(mock(LocationsService)) 

		expect(executor.getExecutableCommandTypes()).toEqual(['type.command.Location.publish']);
	});

	
});