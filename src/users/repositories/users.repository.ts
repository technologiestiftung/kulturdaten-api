import { CreateUserDto } from '../dtos/create.user.dto';
import { PatchUserDto } from '../dtos/patch.user.dto';
import { PutUserDto } from '../dtos/put.user.dto';
import { MongooseService } from '../../common/services/mongoose.service';

import debug from 'debug';
import { PermissionFlag } from '../../auth/middleware/auth.permissionflag.enum';
import { Service } from 'typedi';
import { User, userSchema } from './user';

const log: debug.IDebugger = debug('app:users-repository');


export interface UsersRepository {

	addUser(userFields: CreateUserDto): Promise<string>;

	getUsers(limit: number, page: number): Promise<User[] | null>;

	getUserById(userId: string): Promise<User | null>;

	updateUserById(userId: string, userFields: PatchUserDto | PutUserDto): Promise<User | null>;

	removeUserById(userId: string): Promise<boolean>;

	getUserByEmail(email: string): Promise<User | null>;

	getUserByEmailWithPassword(email: string): Promise<User | null>;
}


@Service()
export class MongoDBUsersRepository {


	UserModel = this.mongooseService.getMongoose().model('Users', userSchema);

	constructor(public mongooseService: MongooseService) {
	}


	async addUser(userFields: CreateUserDto): Promise<string> {
		const user = new this.UserModel({
			...userFields,
			permissionFlags: PermissionFlag.REGISTERED_USER,
		});
		await user.save();
		return user.id;
	}

	async getUserById(userId: string): Promise<User | null> {
		return this.UserModel.findById(userId);
	}

	async getUsers(limit = 25, page = 0): Promise<User[] | null> {
		return this.UserModel.find()
			.limit(limit)
			.skip(limit * page)
			.exec();
	}

	async updateUserById(
		userId: string,
		userFields: PatchUserDto | PutUserDto
	): Promise<User | null> {
		return await this.UserModel.findByIdAndUpdate(
			userId,
			{ $set: userFields },
			{ new: true }
		).exec();
	}

	async removeUserById(userId: string): Promise<boolean> {
		let user = await this.UserModel.findByIdAndDelete(userId).exec();
		if (user) return true;
		else return false;
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return this.UserModel.findOne({ email: email });
	}

	async getUserByEmailWithPassword(email: string): Promise<User | null> {
		return this.UserModel.findOne({ email: email }).select('id email permissionFlags +password');
	}
}