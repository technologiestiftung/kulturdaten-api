import debug from 'debug';
import { User } from '../../../generated/models/User.generated';
import { UpdateUserRequest } from '../../../generated/models/UpdateUserRequest.generated';
import { CreateUserRequest } from '../../../generated/models/CreateUserRequest.generated';


const log: debug.IDebugger = debug('app:users-repository');


export interface UsersRepository {

	addUser(userFields: CreateUserRequest): Promise<string>;

	getUsers(limit: number, page: number): Promise<User[] | null>;

	getUserByIdentifier(userId: string): Promise<User | null>;

	updateUserById(userId: string, userFields: UpdateUserRequest): Promise<boolean>;

	removeUserById(userId: string): Promise<boolean>;

	getUserByEmail(email: string): Promise<User | null>;

	getUserByEmailWithPassword(email: string): Promise<User | null>;
}
