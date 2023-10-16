import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { MongoDBConnector } from "../../../common/services/MongoDBConnector";
import { MONGO_DB_USER_DEFAULT_PROJECTION } from "../../../config/Config";
import { CreateUserRequest } from "../../../generated/models/CreateUserRequest.generated";
import { UpdateUserRequest } from "../../../generated/models/UpdateUserRequest.generated";
import { User } from "../../../generated/models/User.generated";
import { generateID } from "../../../utils/IDUtil";
import { createMetadata, getUpdatedMetadata } from "../../../utils/MetadataUtil";
import { UsersRepository } from "./UsersRepository";

@Service()
export class MongoDBUsersRepository implements UsersRepository {
	constructor(@Inject("DBClient") private dbConnector: MongoDBConnector) {}

	async getUserByEmail(email: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ email: this.sanitizeEmail(email) }, { projection: MONGO_DB_USER_DEFAULT_PROJECTION });
	}

	async getUserByEmailWithPassword(email: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ email: this.sanitizeEmail(email) }, { projection: { _id: 0 } });
	}

	async addUser(createUser: CreateUserRequest): Promise<string> {
		const users = await this.dbConnector.users();
		const metadata = createMetadata();
		const newUser: User = {
			...createUser,
			email: this.sanitizeEmail(createUser.email),
			type: "User",
			identifier: generateID(),
			permissionFlags: 1,
			createdAt: metadata.created,
			updatedAt: metadata.updated,
			memberships: [],
		};
		await users.insertOne(newUser);
		return newUser.identifier;
	}

	async getUsers(pagination?: Pagination): Promise<User[] | null> {
		const users = await this.dbConnector.users();
		let query = users.find({}, { projection: MONGO_DB_USER_DEFAULT_PROJECTION });
		if (pagination) {
			query = query.limit(pagination.pageSize).skip((pagination.page - 1) * pagination.pageSize);
		}
		return query.toArray();
	}

	async getUserByIdentifier(userId: string): Promise<User | null> {
		const users = await this.dbConnector.users();
		return users.findOne({ identifier: userId }, { projection: { _id: 0, password: 0 } });
	}

	async updateUserById(userId: string, userFields: UpdateUserRequest): Promise<boolean> {
		const updatedUser: Partial<User> = {
			...userFields,
			email: userFields.email ? this.sanitizeEmail(userFields.email) : undefined,
			...getUpdatedMetadata(),
		};
		const users = await this.dbConnector.users();
		const result = await users.updateOne({ identifier: userId }, { $set: updatedUser });
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

	private sanitizeEmail(email: string) {
		return email.toLowerCase();
	}
}
