import express from 'express';
import debug from 'debug';
import Container from 'typedi';
import { UsersService } from '../services/users.service';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:users-middleware');


export class checkUsers {

	static eMailIsNotExist = () => async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const email = req.body.email;
		const userService = Container.get(UsersService);
		if(await userService.getUserByEmail(email)){
			res.status(409).send(
				{
					"msg": "email is already in use",
				  }
			);
		} else {
			next();
		}
	}

}
