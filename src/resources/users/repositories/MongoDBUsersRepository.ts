import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/MongoDBConnector";
import { MONGO_DB_DEFAULT_PROJECTION, MONGO_DB_USER_DEFAULT_PROJECTION } from "../../../config/Config";
import { CreateUserRequest } from "../../../generated/models/CreateUserRequest.generated";
import { UpdateUserRequest } from "../../../generated/models/UpdateUserRequest.generated";
import { User } from "../../../generated/models/User.generated";
import { generateID } from "../../../utils/IDUtil";
import { createMetadata, getUpdatedMetadata } from "../../../utils/MetadataUtil";
import { UsersRepository } from "./UsersRepository";
import { Membership } from "../../../generated/models/Membership.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { UpdateOrganizationMembershipRequest } from "../../../generated/models/UpdateOrganizationMembershipRequest.generated";
import { Pagination } from "../../../generated/models/Pagination.generated";

@Service()
export class MongoDBUsersRepository implements UsersRepository {
	constructor(@Inject("DBClient") private dbConnector: MongoDBConnector) {}

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<User[]> {
		const users = await this.dbConnector.users();
		let query = users.find(filter || {}, {
			projection: projection ? { ...projection, ...MONGO_DB_DEFAULT_PROJECTION } : MONGO_DB_DEFAULT_PROJECTION,
		});
		if (pagination) {
			query = query.limit(pagination.pageSize).skip((pagination.page - 1) * pagination.pageSize);
		}

		return query.toArray();
	}

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
		return this.get(undefined, undefined, pagination);
	}

	searchAllUsers(filter: Filter, projection?: object | undefined): Promise<User[]> {
		return this.get(filter, projection, undefined);
	}

	async searchUser(filter: Filter): Promise<User | null> {
		const users = await this.dbConnector.users();
		const user = users.findOne(filter, { projection: MONGO_DB_USER_DEFAULT_PROJECTION });
		return user;
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

	async addMembership(email: string, newMembership: Membership): Promise<boolean> {
		const mail = this.sanitizeEmail(email);
		const users = await this.dbConnector.users();
		const result = await users.updateOne({ email: mail }, { $push: { memberships: newMembership } });
		return result.modifiedCount === 1;
	}

	async deleteMembership(userIdentifier: string, organizationIdentifier: string): Promise<boolean> {
		const users = await this.dbConnector.users();
		const result = await users.updateOne(
			{ identifier: userIdentifier },
			{ $pull: { memberships: { organizationIdentifier: organizationIdentifier } } },
		);
		return result.modifiedCount === 1;
	}

	async updateOrganizationMembership(
		userIdentifier: string,
		organizationIdentifier: string,
		updateOrganizationMembershipRequest: UpdateOrganizationMembershipRequest,
	): Promise<boolean> {
		const users = await this.dbConnector.users();
		const query = {
			identifier: userIdentifier,
			"memberships.organizationIdentifier": organizationIdentifier,
		};
		const update = {
			$set: { "memberships.$.role": updateOrganizationMembershipRequest.role },
		};
		const result = await users.updateOne(query, update);
		return result.modifiedCount === 1;
	}
}
