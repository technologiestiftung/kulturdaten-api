import { Container } from 'typedi';
import { MongooseService } from "../common/services/mongoose.service";
import { MongoDBOrganizersRepository } from "../organizers/repositories/organizers.repository";
import { MongoDBUsersRepository } from "../users/repositories/users.repository";

export function initDependencyInjection() {

	// TODO: make Dependency Injection visible
	Container.get(MongooseService).connectWithRetry();
	Container.set('OrganizersRepository', new MongoDBOrganizersRepository(Container.get(MongooseService)));
	Container.set('UsersRepository', new MongoDBUsersRepository(Container.get(MongooseService)));
}
