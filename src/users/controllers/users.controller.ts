import express from 'express';
import { UsersService } from '../services/users.service';
import argon2 from 'argon2';
import debug from 'debug';
import { Service } from 'typedi';
import { NotFoundError } from '../../generatedModels/NotFoundError.generated';
import { CreateUser } from '../../generatedModels/CreateUser.generated';
import { PatchUser } from '../../generatedModels/PatchUser.generated';

const log: debug.IDebugger = debug('app:users-controller');

@Service()
export class UsersController {

	constructor(
		public usersService: UsersService){}

	async listUsers(res: express.Response) {
		const users = await this.usersService.list(100, 0);

		res.status(200).send({ "users": users });
	}

	async getUserById( res: express.Response, userId: string) {
		const user = await this.usersService.readById(userId);
		if(user){
			res.status(200).send({"user": user });
		} else {
			res.status(404).send({error: {msg: 'User not found'}} as NotFoundError);
		}
	}

	async createUser(res: express.Response, createUser: CreateUser) {
		createUser.password = await argon2.hash(createUser.password);
		const userId = await this.usersService.create(createUser);
		res.status(201).send({ identifier: userId });
	}

	async patch(res: express.Response, userId: string, patchUser: PatchUser) {
		const user = await this.usersService.patchById(userId, patchUser);
		if(user){
			res.status(204).send();
		} else {
			res.status(404).send({error: {msg: 'User not found'}} as NotFoundError);
		}
	}

	async removeUser(res: express.Response, userId: string) {
		if(await this.usersService.deleteById(userId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'User not found'}} as NotFoundError);
		} 
	}
}