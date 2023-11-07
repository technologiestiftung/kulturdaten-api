import debug from "debug";
import { Pagination } from "../../../common/parameters/Pagination";
import { CreateUserRequest } from "../../../generated/models/CreateUserRequest.generated";
import { UpdateUserRequest } from "../../../generated/models/UpdateUserRequest.generated";
import { User } from "../../../generated/models/User.generated";
import { Membership } from "../../../generated/models/Membership.generated";
import { Filter } from "../../../generated/models/Filter.generated";

const log: debug.IDebugger = debug("app:users-repository");

export interface UsersRepository {
	addMembership(email: string, newMembership: Membership): Promise<boolean>;

	deleteMembership(userIdentifier: string, organizationIdentifier: string): Promise<boolean>;

	addUser(userFields: CreateUserRequest): Promise<string>;

	getUsers(pagination?: Pagination): Promise<User[] | null>;

	searchAllUsers(filter: Filter, projection?: object): Promise<User[]>;

	countUsers(): Promise<number>;

	getUserByIdentifier(userId: string): Promise<User | null>;

	updateUserById(userId: string, userFields: UpdateUserRequest): Promise<boolean>;

	removeUserById(userId: string): Promise<boolean>;

	getUserByEmail(email: string): Promise<User | null>;

	getUserByEmailWithPassword(email: string): Promise<User | null>;
}
