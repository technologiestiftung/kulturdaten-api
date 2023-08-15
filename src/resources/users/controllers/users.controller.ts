import express from 'express';
import { UsersService } from '../services/users.service';
import argon2 from 'argon2';
import debug from 'debug';
import { Service } from 'typedi';
import { UpdateUserPasswordRequest } from '../../../generated/models/UpdateUserPasswordRequest.generated';
import { ErrorResponseBuilder, SuccessResponseBuilder } from '../../../common/responses/response.builders';
import { CreateUserRequest } from '../../../generated/models/CreateUserRequest.generated';
import { UpdateUserRequest } from '../../../generated/models/UpdateUserRequest.generated';

const log: debug.IDebugger = debug('app:users-controller');

@Service()
export class UsersController {


	constructor(
		public usersService: UsersService){}

	async listUsers(res: express.Response, page: number, pageSize: number) {
		const users = await this.usersService.list(page, pageSize);
		const totalCount = await this.usersService.countUsers();

		if (users) {
			res.status(200).send(new SuccessResponseBuilder().okResponse(
				{ 
					page: page,
					pageSize: pageSize,
					totalCount: totalCount,
					users: users 
				}).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Users not found").build());
		}
	}

	async getUserById( res: express.Response, userId: string) {
		const user = await this.usersService.readById(userId);
		if (user) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ user: user }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("User not found").build());
		}
	}

	async createUser(res: express.Response, createUser: CreateUserRequest) {
		createUser.password = await argon2.hash(createUser.password);
		const userId = await this.usersService.create(createUser);
		if (userId) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ identifier: userId } ).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An user cannot be created with the data.").build());
		}
		
	}

	async patch(res: express.Response, userId: string, patchUser: UpdateUserRequest) {
		const user = await this.usersService.patchById(userId, patchUser);

		if (user) {
			res.status(204).send();
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("User not found").build());
		}
	}

	async removeUser(res: express.Response, userId: string) {
		if(await this.usersService.deleteById(userId))
		{
			res.status(204).send();
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("User not found").build());
		}
	}

	updateUserPassword(res: express.Response<any, Record<string, any>>, identifier: string, updatePasswordRequest: UpdateUserPasswordRequest) {
		throw new Error('Method not implemented.');
	}
}