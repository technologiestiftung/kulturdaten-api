import { CreateUserDto } from "../../../users/dtos/create.user.dto";
import { PatchUserDto } from "../../../users/dtos/patch.user.dto";
import { User } from "../../../users/repositories/user";
import { UsersRepository } from "../../../users/repositories/users.repository";
import { faker } from '@faker-js/faker';
import { PermissionFlag } from "../../../common/middleware/common.permissionflag.enum";



export class MockUsersRepository implements UsersRepository {


	constructor(public dummyUsers: User[] = []) { } 
	
	
	getUserByEmail(email: string): Promise<{ _id?: string | undefined; email?: string | undefined; password?: string | undefined; firstName?: string | undefined; lastName?: string | undefined; created?: string | undefined; updated?: string | undefined; permissionFlags?: number | undefined; } | null> {
		throw new Error("Method not implemented.");
	}
	getUserByEmailWithPassword(email: string): Promise<{ _id?: string | undefined; email?: string | undefined; password?: string | undefined; firstName?: string | undefined; lastName?: string | undefined; created?: string | undefined; updated?: string | undefined; permissionFlags?: number | undefined; } | null> {
		throw new Error("Method not implemented.");
	}
	;

	reset() {
		this.dummyUsers = [];
	}

	public fillWithDummyUsers(number: number) {
		this.dummyUsers = dummyUsers(number);
	}

	public addDummyUser() {
		const d = dummyUser();
		this.dummyUsers.push(d);
		return d._id;
	}

	async addUser(userFields: CreateUserDto): Promise<string> {
		let newUser: User = {
			...userFields
		}
		newUser._id = `IDfor${userFields.email}`;
		this.dummyUsers.push(newUser);
		return Promise.resolve(newUser._id);
	}
	async getUsers(limit: number, page: number): Promise<User[] | null> {
		return Promise.resolve(this.dummyUsers);
	}
	async getUserById(userId: string): Promise<User | null> {
		try {
			let user: User | undefined = this.dummyUsers.find(({ _id }) => _id === userId)
			if (user) {
				return Promise.resolve(user);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}

	}
	async updateUserById(userId: string, userFields: PatchUserDto): Promise<User | null> {
		if (userFields) {
			const index = this.dummyUsers.findIndex(({ _id }) => _id === userId);

			let updatedUser: User = {
				...userFields
			}
			updatedUser._id = userId;
			if (index !== -1) {
				this.dummyUsers[index] = updatedUser;
				return updatedUser;
			} else {
				return null;
			}
		}
		return null;
	}
	async removeUserById(userId: string): Promise<boolean> {
		const index = this.dummyUsers.findIndex(({ _id }) => _id === userId);
		if (index >= 0) {
			delete this.dummyUsers[index];
			return true;
		}
		return false;
	}

}


export function dummyUser(permissionFlag: PermissionFlag = PermissionFlag.REGISTERED_USER): User {
	return {
		_id: faker.database.mongodbObjectId(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		created: faker.datatype.datetime().toDateString(),
		updated: faker.datatype.datetime().toDateString(),
		permissionFlags: permissionFlag
	}
}

export function dummyCreateDto(): CreateUserDto {
	return {
		email: faker.internet.email(),
		password: faker.internet.password(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
	}
}

export function dummyUsers(number: number): User[] {
	let users: User[] = [];
	for (let index = 0; index < number; index++) {
		users.push(dummyUser());
	}
	return users;
}

