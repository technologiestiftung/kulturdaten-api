import debug from 'debug';
import { User } from '../models/user.generated';
import { CreateUser } from '../dtos/create.user.dto.generated';
import { PatchUser } from '../dtos/patch.user.dto.generated';


const log: debug.IDebugger = debug('app:users-repository');


export interface UsersRepository {

	addUser(userFields: CreateUser): Promise<string>;

	getUsers(limit: number, page: number): Promise<User[] | null>;

	getUserByIdentifier(userId: string): Promise<User | null>;

	updateUserById(userId: string, userFields: PatchUser): Promise<boolean>;

	removeUserById(userId: string): Promise<boolean>;

	getUserByEmail(email: string): Promise<User | null>;

	getUserByEmailWithPassword(email: string): Promise<User | null>;
}
