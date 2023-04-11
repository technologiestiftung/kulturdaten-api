import debug from 'debug';
import { CreateUser } from '../../generatedModels/CreateUser.generated';
import { User } from '../../generatedModels/User.generated';
import { PatchUser } from '../../generatedModels/PatchUser.generated';


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
