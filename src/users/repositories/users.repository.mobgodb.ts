import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { UsersRepository } from "./users.repository";
import { generateID } from "../../utils/IDUtil";
import { User } from "../../generated/models/User.generated";
import { CreateUser } from "../../generated/models/CreateUser.generated";
import { PatchUser } from "../../generated/models/PatchUser.generated";
import { Db } from "mongodb";


@Service()
export class MongoDBUsersRepository implements UsersRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }

	async getUserByEmail(email: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ email: email }, { projection: { _id: 0, password:0 } });
	}
	async getUserByEmailWithPassword(email: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ email: email }, { projection: { _id: 0 } });
	}

	async addUser(createUser: CreateUser): Promise<string> {
		const newUser = createUser as User;
		newUser.identifier = generateID();
		newUser.permissionFlags = 1;

		const users = await this.dbConnector.users();
		await users.insertOne(newUser);
		return newUser.identifier;
	}
	async getUsers(limit: number, page: number): Promise<User[] | null> {
		const users = await this.dbConnector.users();
		return users.find({}, { projection: { _id: 0,  password:0} }).toArray();
	}
	async getUserByIdentifier(userId: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ identifier: userId }, { projection: { _id: 0, password:0 } });
	}
	async updateUserById(userId: string, userFields: PatchUser): Promise<boolean> {
		const users = await this.dbConnector.users();
		const result = await users.updateOne({ identifier: userId }, { $set: userFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeUserById(userId: string): Promise<boolean> {
		const users = await this.dbConnector.users();
		const result = await users.deleteOne({ identifier: userId });
		return Promise.resolve(result.deletedCount === 1);
	}
}