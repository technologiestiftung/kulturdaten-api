import express from 'express';
import { UsersService } from '../services/users.service';
import { DateUtil }  from '../../utils/DateUtil';
import argon2 from 'argon2';
import debug from 'debug';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:users-controller');

@Service()
export class UsersController {

	constructor(
		public usersService: UsersService, public dateUtil: DateUtil){}

	async listUsers(req: express.Request, res: express.Response) {
		const users = await this.usersService.list(100, 0);

		res.status(200).send({ "users": users });
	}

	async getUserById(req: express.Request, res: express.Response) {
		const { userId } = req.params;
		const user = await this.usersService.readById(userId);
		if(user){
			res.status(200).send({"user": user });
		} else {
			res.status(404).send({error: {msg: 'User not found'}});
		}
	}

	async createUser(req: express.Request, res: express.Response) {
		req.body.password = await argon2.hash(req.body.password);
		const now = this.dateUtil.now();
		req.body.created = now;
		req.body.updated = now;
		const userId = await this.usersService.create(req.body);
		res.status(201).send({ id: userId });
	}

	async patch(req: express.Request, res: express.Response) {
		const { userId } = req.params;
		req.body.updated = this.dateUtil.now();
		if (req.body.password) {
			req.body.password = await argon2.hash(req.body.password);
		}
		const user = await this.usersService.patchById(userId, req.body);
		if(user){
			res.status(204).send();
		} else {
			res.status(404).send({error: {msg: 'User not found'}});
		}
	}

	async removeUser(req: express.Request, res: express.Response) {
		const { userId } = req.params;
		if(await this.usersService.deleteById(userId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'User not found'}});
		} 
	}
}