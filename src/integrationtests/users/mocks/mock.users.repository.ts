import { CreateUserDto } from "../../../users/dtos/create.user.dto";
import { PatchUserDto } from "../../../users/dtos/patch.user.dto";
import { User } from "../../../users/repositories/user";
import { UsersRepository } from "../../../users/repositories/users.repository";
import { faker } from '@faker-js/faker';
import { PermissionFlag } from "../../../common/middleware/common.permissionflag.enum";



export class MockUsersRepository implements UsersRepository {


	constructor(public dummyUsers: User[] = []) { } 
	
	
	getUserByEmail(userEmail: string): Promise<User | null> {
		try {
			let user: User | undefined = this.dummyUsers.find(({ email }) => email === userEmail)
			if (user) {
				return Promise.resolve(user);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}
	}
	getUserByEmailWithPassword(email: string): Promise<User | null> {
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
		return d.id;
	}

	async addUser(userFields: CreateUserDto): Promise<string> {
		let newUser: User = {
			id: `IDfor${userFields.email}`,
			...userFields,
			permissionFlags: userFields.permissionFlags ?? 1
		}
		newUser.id = `IDfor${userFields.email}`;
		this.dummyUsers.push(newUser);
		return Promise.resolve(newUser.id);
	}
	async getUsers(limit: number, page: number): Promise<User[] | null> {
		return Promise.resolve(this.dummyUsers);
	}
	async getUserById(userId: string): Promise<User | null> {
		try {
			let user: User | undefined = this.dummyUsers.find(({ id }) => id === userId)
			if (user) {
				return Promise.resolve(user);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}

	}
	async updateUserById(userId: string, userFields: PatchUserDto): Promise<User | null> {
		if (userFields) {
			const index = this.dummyUsers.findIndex(({ id }) => id === userId);
		
			if (index !== -1) {
				if(userFields.email) this.dummyUsers[index].email = userFields.email;
				if(userFields.firstName) this.dummyUsers[index].firstName = userFields.firstName;
				if(userFields.lastName) this.dummyUsers[index].lastName = userFields.lastName;
				if(userFields.password) this.dummyUsers[index].password = userFields.password;
				if(userFields.permissionFlags) this.dummyUsers[index].permissionFlags = userFields.permissionFlags;
				return this.dummyUsers[index];
			} else {
				return null;
			}
		}
		return null;
	}
	async removeUserById(userId: string): Promise<boolean> {
		const index = this.dummyUsers.findIndex(({ id }) => id === userId);
		if (index >= 0) {
			delete this.dummyUsers[index];
			return true;
		}
		return false;
	}

}


export function dummyUser(permissionFlag: PermissionFlag = PermissionFlag.REGISTERED_USER): User {
	return {
		id: faker.database.mongodbObjectId(),
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

