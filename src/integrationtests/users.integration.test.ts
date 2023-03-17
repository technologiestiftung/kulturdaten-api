import express from "express";
import request from "supertest";
import { JwtMiddleware } from "../auth/middleware/jwt.middleware";
import { CommonPermissionMiddleware } from "../common/middleware/common.permission.middleware";
import { UsersController } from "../users/controllers/users.controller";
import { UsersMiddleware } from "../users/middleware/users.middleware";
import { UsersService } from "../users/services/users.service";
import { UsersRoutes } from "../users/users.routes";
import { DateUtil } from "../utils/DateUtil";
import { MockUsersRepository } from "./mocks/mock.users.repository";
import { mock, instance, when, verify, anything, deepEqual, capture } from 'ts-mockito';

const app = express();
app.use(express.json());

process.env.JWT_SECRET = 'geheim';

const usersRepository = new MockUsersRepository();
const userSerivce = new UsersService(usersRepository);
const dateUtil = new DateUtil();
const userController = new UsersController(userSerivce,dateUtil);
const jwtMiddleware = new JwtMiddleware(userSerivce);
const usersMiddleware = new UsersMiddleware(userSerivce);
const permissionMiddleware = new CommonPermissionMiddleware();
const userRoutes = 
	new UsersRoutes(userController,jwtMiddleware,usersMiddleware,permissionMiddleware);


app.use('/v1/users', userRoutes.getRouter());

describe('Exploring existing users', () => {
	it('GET /v1/users - success - get all the users', async () => {
		const { body, statusCode } = await request(app).get('/v1/users');

		expect(statusCode).toBe(200);
		expect(body.organizers).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					_id: expect.any(String),
					name: expect.any(String),
					description: expect.any(String),
					created: expect.any(String),
					updated: expect.any(String),
				})
			])
		);
	});

});

