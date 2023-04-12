import { UsersRepository } from "../../../users/repositories/users.repository";
import { faker } from '@faker-js/faker';
import { PermissionFlag } from "../../../auth/middleware/auth.permissionflag.enum";
import { User } from "../../../generated/models/User.generated";
import { CreateUser } from "../../../generated/models/CreateUser.generated";
import { PatchUser } from "../../../generated/models/PatchUser.generated";



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
		return d.identifier;
	}

	async addUser(userFields: CreateUser): Promise<string> {
		let newUser: User = {
			identifier: `IDfor${userFields.email}`,
			...userFields,
			permissionFlags:  1
		};
		delete newUser.password;
		newUser.identifier = `IDfor${userFields.email}`;
		this.dummyUsers.push(newUser);
		return Promise.resolve(newUser.identifier);
	}
	async getUsers(limit: number, page: number): Promise<User[] | null> {
		return Promise.resolve(this.dummyUsers);
	}
	async getUserByIdentifier(userId: string): Promise<User | null> {
		try {
			let user: User | undefined = this.dummyUsers.find(({ identifier }) => identifier === userId)
			if (user) {
				return Promise.resolve(user);
			} else return Promise.resolve(null);
		} catch (error) {
			return Promise.resolve(null);
		}

	}
	async updateUserById(userId: string, userFields: PatchUser): Promise<boolean> {
		if (userFields) {
			const index = this.dummyUsers.findIndex(({ identifier }) => identifier === userId);
		
			if (index !== -1) {
				if(userFields.email) this.dummyUsers[index].email = userFields.email;
				if(userFields.firstName) this.dummyUsers[index].firstName = userFields.firstName;
				if(userFields.lastName) this.dummyUsers[index].lastName = userFields.lastName;
				if(userFields.permissionFlags) this.dummyUsers[index].permissionFlags = userFields.permissionFlags;
				return Promise.resolve(true);
			} else {
				return Promise.resolve(false);
			}
		}
		return Promise.resolve(false);
	}
	async removeUserById(userId: string): Promise<boolean> {
		const index = this.dummyUsers.findIndex(({ identifier }) => identifier === userId);
		if (index >= 0) {
			delete this.dummyUsers[index];
			return true;
		}
		return false;
	}

}


export function dummyUser(permissionFlag: PermissionFlag = PermissionFlag.REGISTERED_USER): User {
	return {
		identifier: faker.database.mongodbObjectId(),
		email: faker.internet.email(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		createdAt: faker.datatype.datetime().toDateString(),
		updatedAt: faker.datatype.datetime().toDateString(),
		permissionFlags: permissionFlag
	}
}

export function dummyCreateDto(): CreateUser {
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

