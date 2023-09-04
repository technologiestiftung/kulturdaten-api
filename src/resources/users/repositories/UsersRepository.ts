import debug from "debug";
import { Pagination } from "../../../common/parameters/Pagination";
import { CreateUserRequest } from "../../../generated/models/CreateUserRequest.generated";
import { UpdateUserRequest } from "../../../generated/models/UpdateUserRequest.generated";
import { User } from "../../../generated/models/User.generated";

const log: debug.IDebugger = debug("app:users-repository");

export interface UsersRepository {
	addUser(userFields: CreateUserRequest): Promise<string>;

	getUsers(pagination?: Pagination): Promise<User[] | null>;

	countUsers(): Promise<number>;

	getUserByIdentifier(userId: string): Promise<User | null>;

	updateUserById(userId: string, userFields: UpdateUserRequest): Promise<boolean>;

	removeUserById(userId: string): Promise<boolean>;

	getUserByEmail(email: string): Promise<User | null>;

	getUserByEmailWithPassword(email: string): Promise<User | null>;
}
