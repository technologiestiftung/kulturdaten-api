import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { UsersRepository } from "./users.repository";
import { generateID } from "../../../utils/IDUtil";
import { User } from "../../../generated/models/User.generated";
import { CreateUserRequest } from "../../../generated/models/CreateUserRequest.generated";
import { UpdateUserRequest } from "../../../generated/models/UpdateUserRequest.generated";


@Service()
export class MongoDBUsersRepository implements UsersRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async getUserByEmail(email: string): Promise<User | null> {
		email = email.toLowerCase();
		const users = await this.dbConnector.users();
		return users.findOne({ email: email }, { projection: { _id: 0, password:0 } });
	}
	async getUserByEmailWithPassword(email: string): Promise<User | null> {
		email = email.toLowerCase();
		const users = await this.dbConnector.users();
		return users.findOne({ email: email }, { projection: { _id: 0 } });
	}

	async addUser(createUser: CreateUserRequest): Promise<string> {
		const newUser = createUser as User;
		newUser.identifier = generateID();
		newUser.permissionFlags = 1;
		newUser.email = createUser.email.toLowerCase();

		const users = await this.dbConnector.users();
		await users.insertOne(newUser);
		return newUser.identifier;
	}
	async getUsers(page:number, pageSize:number): Promise<User[] | null> {
		if (pageSize <= 0) {pageSize = 1;}
		if (page <= 0) {page = 1;}
		const users = await this.dbConnector.users();
		return users
			.find({}, { projection: { _id: 0,  password:0} })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
	}
	async getUserByIdentifier(userId: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ identifier: userId }, { projection: { _id: 0, password:0 } });
	}
	async updateUserById(userId: string, userFields: UpdateUserRequest): Promise<boolean> {
		if(userFields.email) userFields.email = userFields.email.toLowerCase();
		const users = await this.dbConnector.users();
		const result = await users.updateOne({ identifier: userId }, { $set: userFields });
		return result.modifiedCount === 1;
	}
	async removeUserById(userId: string): Promise<boolean> {
		const users = await this.dbConnector.users();
		const result = await users.deleteOne({ identifier: userId });
		return result.deletedCount === 1;
	}

	async countUsers(): Promise<number> {
		const users = await this.dbConnector.users();
		return users.countDocuments();
	}
}