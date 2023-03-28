import express from 'express';
import debug from 'debug';
import Container from 'typedi';
import { UsersService } from '../services/users.service';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:users-middleware');


export class checkUsers {

	 static eMailIsNotExist = async (email: any) => {
		const userService = Container.get(UsersService);
		if(await userService.getUserByEmail(email)) return Promise.reject('Email already in use');
	  }

}
