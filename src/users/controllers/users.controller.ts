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
		res.status(200).send({"users": users});
	}

	async getUserById(req: express.Request, res: express.Response) {
		const user = await this.usersService.readById(req.body.id);
		if(user){
			res.status(200).send({"user": user});
		} else {
			res.status(404).send();
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
		req.body.updated = this.dateUtil.now();
		if (req.body.password) {
			req.body.password = await argon2.hash(req.body.password);
		}
		log(await this.usersService.patchById(req.body.id, req.body));
		res.status(204).send();
	}

	async put(req: express.Request, res: express.Response) {
		req.body.updated = this.dateUtil.now();
		req.body.password = await argon2.hash(req.body.password);
		log(await this.usersService.putById(req.body.id, req.body));
		res.status(204).send();
	}

	async removeUser(req: express.Request, res: express.Response) {
		log(await this.usersService.deleteById(req.body.id));
		res.status(204).send();
	}
}