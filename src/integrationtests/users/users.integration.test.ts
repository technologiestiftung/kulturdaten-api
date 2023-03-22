import express from "express";
import request from "supertest";
import { CommonPermissionMiddleware } from "../../common/middleware/common.permission.middleware";
import { UsersController } from "../../users/controllers/users.controller";
import { UsersMiddleware } from "../../users/middleware/users.middleware";
import { UsersService } from "../../users/services/users.service";
import { UsersRoutes } from "../../users/users.routes";
import { DateUtil } from "../../utils/DateUtil";
import { MockUsersRepository } from "./mocks/mock.users.repository";
import { mockTokenForExistUser } from "../utils/mock.auth.strategy"
import { mock, instance, when, verify, anything, deepEqual, capture } from 'ts-mockito';
import { PermissionFlag } from "../../common/middleware/common.permissionflag.enum";
import passport from "passport";


const app = express();
app.use(express.json());

process.env.JWT_SECRET = 'geheim';

const usersRepository = new MockUsersRepository();
const userSerivce = new UsersService(usersRepository);
const dateUtil = new DateUtil();
const userController = new UsersController(userSerivce, dateUtil);
const usersMiddleware = new UsersMiddleware(userSerivce);
const permissionMiddleware = new CommonPermissionMiddleware();
const userRoutes =
	new UsersRoutes(userController, usersMiddleware, permissionMiddleware);

app.use('/v1/users', userRoutes.getRouter());

afterEach(() => {
	passport.unuse('authenticated-user');
});


describe('Exploring existing users', () => {
	it('GET /v1/users - success - get all the users', async () => {
		const authToken = mockTokenForExistUser({
			id: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION
		});
		usersRepository.fillWithDummyUsers(5);

		const { body, statusCode } = await request(app).get('/v1/users').set('Authorization', 'bearer ' + authToken);

		expect(statusCode).toBe(200);
		expect(body.users).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					_id: expect.any(String),
					firstName: expect.any(String),
					lastName:  expect.any(String),
					email: expect.any(String),
					created: expect.any(String),
					updated: expect.any(String),
				})
			])
		);
	});

});

