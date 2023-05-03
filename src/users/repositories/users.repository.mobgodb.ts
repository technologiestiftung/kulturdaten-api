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

	private users;

	constructor(@Inject('Database') private db: Db) { 
		this.users = db.collection<User>('users');
	}

	getUserByEmail(email: string): Promise<User | null> {
		return this.users.findOne({ email: email }, { projection: { _id: 0, password:0 } });
	}
	getUserByEmailWithPassword(email: string): Promise<User | null> {
		return this.users.findOne({ email: email }, { projection: { _id: 0 } });
	}

	async addUser(createUser: CreateUser): Promise<string> {
		const newUser = createUser as User;
		newUser.identifier = generateID();
		newUser.permissionFlags = 1;
		await this.users.insertOne(newUser);
		return newUser.identifier;
	}
	getUsers(limit: number, page: number): Promise<User[] | null> {
		return this.users.find({}, { projection: { _id: 0,  password:0} }).toArray();
	}
	getUserByIdentifier(userId: string): Promise<User | null> {
		return this.users.findOne({ identifier: userId }, { projection: { _id: 0, password:0 } });
	}
	async updateUserById(userId: string, userFields: PatchUser): Promise<boolean> {
		const result = await this.users.updateOne({ identifier: userId }, { $set: userFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeUserById(userId: string): Promise<boolean> {
		const result = await this.users.deleteOne({ identifier: userId });
		return Promise.resolve(result.deletedCount === 1);
	}
}