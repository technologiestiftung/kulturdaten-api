import { Service } from "typedi";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { UsersRepository } from "./users.repository";
import { generateID } from "../../utils/IDUtil";
import { User } from "../../generatedModels/User.generated";
import { CreateUser } from "../../generatedModels/CreateUser.generated";
import { PatchUser } from "../../generatedModels/PatchUser.generated";


@Service()
export class MongoDBUsersRepository implements UsersRepository {

	constructor(private db: MongoDBConnector) { }

	getUserByEmail(email: string): Promise<User | null> {
		return this.db.users().findOne({ email: email }, { projection: { _id: 0, password:0 } });
	}
	getUserByEmailWithPassword(email: string): Promise<User | null> {
		return this.db.users().findOne({ email: email }, { projection: { _id: 0 } });
	}

	async addUser(createUser: CreateUser): Promise<string> {
		const newUser = createUser as User;
		newUser.identifier = generateID();
		newUser.permissionFlags = 1;
		await this.db.users().insertOne(createUser as User);
		return newUser.identifier;
	}
	getUsers(limit: number, page: number): Promise<User[] | null> {
		return this.db.users().find({}, { projection: { _id: 0,  password:0} }).toArray();
	}
	getUserByIdentifier(userId: string): Promise<User | null> {
		return this.db.users().findOne({ identifier: userId }, { projection: { _id: 0, password:0 } });
	}
	async updateUserById(userId: string, userFields: PatchUser): Promise<boolean> {
		const result = await this.db.users().updateOne({ identifier: userId }, { $set: userFields });
		return Promise.resolve(result.modifiedCount === 1);
	}
	async removeUserById(userId: string): Promise<boolean> {
		const result = await this.db.users().deleteOne({ identifier: userId });
		return Promise.resolve(result.deletedCount === 1);
	}
}