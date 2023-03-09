import { UsersRepository } from '../repositories/users.repository';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dtos/create.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';
import { PatchUserDto } from '../dtos/patch.user.dto';
import { Inject, Service } from 'typedi';

@Service()
export class UsersService implements CRUD {

	constructor(@Inject('UsersRepository') public usersRepository: UsersRepository){}

	async create(resource: CreateUserDto) {
		return this.usersRepository.addUser(resource);
	}

	async deleteById(id: string) {
		return this.usersRepository.removeUserById(id);
	}

	async list(limit: number, page: number) {
		return this.usersRepository.getUsers(limit, page);
	}

	async patchById(id: string, resource: PatchUserDto) {
		return this.usersRepository.updateUserById(id, resource);
	}

	async readById(id: string) {
		return this.usersRepository.getUserById(id);
	}

	async putById(id: string, resource: PutUserDto) {
		return this.usersRepository.updateUserById(id, resource);
	}

	async getUserByEmail(email: string) {
		return this.usersRepository.getUserByEmail(email);
	}

	async getUserByEmailWithPassword(email: string){
		return this.usersRepository.getUserByEmailWithPassword(email);
	}

}
