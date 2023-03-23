import 'reflect-metadata';
import express from "express";
import request from "supertest";
import { UsersController } from "../../users/controllers/users.controller";
import { UsersService } from "../../users/services/users.service";
import { UsersRoutes } from "../../users/users.routes";
import { DateUtil } from "../../utils/DateUtil";
import { MockUsersRepository } from "./mocks/mock.users.repository";
import { mockTokenForExistUser } from "../utils/mock.auth.strategy"
import { PermissionFlag } from "../../auth/middleware/auth.permissionflag.enum";
import passport from "passport";
import Container from 'typedi';


const app = express();
app.use(express.json());

process.env.JWT_SECRET = 'geheim';

const usersRepository = new MockUsersRepository();
const userSerivce = new UsersService(usersRepository);
const dateUtil = new DateUtil();
const userController = new UsersController(userSerivce, dateUtil);
const userRoutes =
	new UsersRoutes(userController);

app.use('/v1/users', userRoutes.getRouter());

beforeAll(() => {
	Container.set('UsersRepository', usersRepository);
})

afterAll(() => {
	Container.reset();
})

afterEach(() => {
	passport.unuse('authenticated-user');
});


describe('Exploring existing users', () => {
	it('GET /v1/users - success - get all the users', async () => {
		const authToken = mockTokenForExistUser({id: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION});
		usersRepository.fillWithDummyUsers(5);

		const { body, statusCode } = await request(app).get('/v1/users').set('Authorization', 'bearer ' + authToken);

		expect(statusCode).toBe(200);
		expect(body.users).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					firstName: expect.any(String),
					lastName:  expect.any(String),
					email: expect.any(String),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				})
			])
		);
	});

	it('POST  /v1/users - failure on invalid post body', async () => {
		const { body, statusCode } = await await request(app).post('/v1/users').send({
			email: 'newMail@ts.berlin'
		});

		expect(statusCode).toBe(400);
		expect(body).toEqual({
			errors: [
				{
					location: 'body',
					msg: 'Password is required',
					param: 'password'
				}
			]
		});
	});

	it('POST  /v1/users - failure if email already in use', async () => {
		const existUser = await usersRepository.getUserById(usersRepository.addDummyUser() ?? "");

		const { body, statusCode } = await await request(app).post('/v1/users').send({
			email: existUser?.email,
			password: "GEHEIM"
		});

		expect(statusCode).toBe(400);
		expect(body).toEqual({
			errors: [
				{
					location: 'body',
					msg: 'Email already in use',
					param: 'email',
					value: expect.any(String),
				}
			]
		});
	});

	it('POST /v1/users - success - get new userId', async () => {
		const { body, statusCode } = await request(app).post('/v1/users').send({
			email: "new@mail.com",
			password: "GEHEIM"
		});

		expect(statusCode).toBe(201);

		expect(body).toEqual(expect.objectContaining({
			id: expect.any(String),
		}));
	});

	it('GET /v1/users/:userId - failure when user is not found', async () => {
		const authToken = mockTokenForExistUser({id: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

		const { body, statusCode } = await request(app).get('/v1/users/wrongID').set('Authorization', 'bearer ' + authToken);

		expect(statusCode).toBe(404);

		expect(body).toEqual({
			error: {
				msg: 'User not found'
			}
		});
	});

});

