import { UsersRepository } from '../repositories/users.repository';
import { CRUD } from '../../../common/interfaces/crud.interface';
import { Inject, Service } from 'typedi';
import { CreateUserRequest } from '../../../generated/models/CreateUserRequest.generated';
import { UpdateUserRequest } from '../../../generated/models/UpdateUserRequest.generated';

@Service()
export class UsersService implements CRUD {

	constructor(@Inject('UsersRepository') public usersRepository: UsersRepository){}

	async create(createUser: CreateUserRequest) {
		return this.usersRepository.addUser(createUser);
	}

	async deleteById(id: string) {
		return this.usersRepository.removeUserById(id);
	}

	async list(limit: number, page: number) {
		return this.usersRepository.getUsers(limit, page);
	}

	async patchById(id: string, resource: UpdateUserRequest) {
		return this.usersRepository.updateUserById(id, resource);
	}

	async readById(id: string) {
		return this.usersRepository.getUserByIdentifier(id);
	}


	async getUserByEmail(email: string) {
		return this.usersRepository.getUserByEmail(email);
	}

	async getUserByEmailWithPassword(email: string){
		return this.usersRepository.getUserByEmailWithPassword(email);
	}

}
