import { Collection, Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../../common/services/mongodb.service';
import { MongoDBUsersRepository } from '../../users/repositories/users.repository.mongodb';
import { UsersService } from '../../users/services/users.service';
import { UsersController } from '../../users/controllers/users.controller';
import { UsersRoutes } from '../../users/users.routes';
import express from 'express';
import request from "supertest";
import { User, validateUser } from '../../generated/models/User.generated';
import fiveDummyUsers from './dummy.data/users.json';
import { IDENTIFIER_REG_EX } from '../utils/matcher';
import { mockTokenForExistUser } from "../utils/mock.auth.strategy";
import { PermissionFlag } from "../../auth/middleware/auth.permissionflag.enum";
import { fakeCreateUser } from '../../generated/faker/faker.CreateUser.generated';

describe('Create users', () => {
  afterEach(async () => {
    await users.deleteMany();
  });

  it('should create a user and return a identifier / POST /users', async () => {
    const { body, statusCode } = await request(app).post('/v1/users').send(fakeCreateUser(false));

    expect(statusCode).toBe(201);

    expect(body.identifier).toMatch(IDENTIFIER_REG_EX);
  });

  it('should create a user with lowercase mail / POST /users', async () => {
    const { body, statusCode } = await request(app).post('/v1/users').send(fakeCreateUser(false, { email: 'Peter@ExaMple.com'}));

    expect(statusCode).toBe(201);

    expect(body.identifier).toMatch(IDENTIFIER_REG_EX);
    let loc  = await users.findOne({identifier: body.identifier});
    expect(loc?.email).toBe('peter@example.com');
  });
});


describe('Read users', () => {
  beforeEach(async () => {
    await users.insertMany(fiveDummyUsers);
  });

  afterEach(async () => {
    await users.deleteMany();
  });

  it('should return a list of all users / GET /users', async () => {
    const authToken = mockTokenForExistUser({identifier: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

    const { body, statusCode } = await request(app).get('/v1/users').set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(200);
    expect(body.users).toHaveLength(5);
    for (const o of body.users) {
      expect(validateUser(o).isValid).toBe(true);
    }
  });

  it('should return a empty list / GET /users', async () => {
    const authToken = mockTokenForExistUser({identifier: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

    await users.deleteMany();

    const { body, statusCode } = await request(app).get('/v1/users').set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(200);
    expect(body.users).toHaveLength(0);
  });

  it('should return an error when an invalid ID is provided / GET /users/invalidID', async () => {
    const authToken = mockTokenForExistUser({identifier: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

    const { body, statusCode } = await request(app).get('/v1/users/invalidID').set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('User not found');
  });

  it('should return a single user / GET /users/existID', async () => {
    const authToken = mockTokenForExistUser({identifier: "1", email: "user@ts.berlin", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

    const { body, statusCode } = await request(app).get('/v1/users/1002').set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(200);
    expect(validateUser(body.user).isValid).toBe(true);
    expect(body.user.identifier).toBe('1002');
    expect(body.user.firstName).toBe('Jane');
  });
});


describe('Update users', () => {
  beforeEach(async () => {
    await users.insertMany(fiveDummyUsers);
  });

  afterEach(async () => {
    await users.deleteMany();
  });

  it('should update the name of a user / PATCH /users/existID', async () => {
    const authToken = mockTokenForExistUser({identifier: '1001', email: "user1@example.com", permissionFlags: PermissionFlag.REGISTERED_USER});

    const { body, statusCode } = await request(app).patch('/v1/users/1001').send({
			firstName: 'Neuer Name'
		}).set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(204);
    let loc = await users.findOne({identifier: '1001'});
    expect(loc?.firstName).toBe('Neuer Name');
  });

  it('should return an error when an invalid ID is provided / PATCH /users/invalidID', async () => {
    const authToken = mockTokenForExistUser({identifier: '1001', email: "user1@example.com", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

    const { body, statusCode } = await request(app).patch('/v1/users/invalidID').send({
			name: { de :'Neuer Name' }
		}).set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(404);
    expect(body.error.msg).toBe('User not found');
  });

  it('should update the email as lowercase / PATCH /users/existID', async () => {
    const authToken = mockTokenForExistUser({identifier: '1001', email: "user1@example.com", permissionFlags: PermissionFlag.REGISTERED_USER});

    const { body, statusCode } = await request(app).patch('/v1/users/1001').send({
			email: 'PeTer@ExamPle.de'
		}).set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(204);
    let loc = await users.findOne({identifier: '1001'});
    expect(loc?.email).toBe('peter@example.de');
  });
});

describe('Delete users', () => {
  beforeEach(async () => {
    await users.insertMany(fiveDummyUsers);
  });

  afterEach(async () => {
    await users.deleteMany();
  });

  it('should remove a user from database / PATCH /users/existID', async () => {
    const authToken = mockTokenForExistUser({identifier: '1001', email: "user1@example.com", permissionFlags: PermissionFlag.ADMIN_PERMISSION});

    const { body, statusCode } = await request(app).delete('/v1/users/1001').set('Authorization', 'bearer ' + authToken);

    expect(statusCode).toBe(204);
    let loc = await users.findOne({identifier: '1001'});
    expect(loc).toBeNull
  });
});



let con: MongoClient;
let mongoServer: MongoMemoryServer;
let connector: MongoDBConnector;
let app: express.Application;
let users: Collection;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'api-db' } });
  process.env.MONGO_URI = mongoServer.getUri();
  con = await MongoClient.connect(mongoServer.getUri(), {});
  connector = new MongoDBConnector(con);
  const usersRepository = new MongoDBUsersRepository(connector);
  const usersService = new UsersService(usersRepository);
  const usersController = new UsersController(usersService);
  const usersRoutes = new UsersRoutes(usersController, usersService);
  const db = con.db('api-db');
  users = db.collection('users');

  app = express();
  app.use(express.json());
  app.use('/v1/users', usersRoutes.getRouter());
});

afterAll(async () => {
  if (con) {
    await con.close();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
  if (connector) {
    await connector.close();
  }
});