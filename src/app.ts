import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import { UsersRoutes } from './users/users.routes.config';
import { OrganizersRoutes } from './organizers/organizers.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';

import { Container } from 'typedi';

import debug from 'debug';

import { MongooseService } from './common/services/mongoose.service';
import { MongoDBOrganizersRepository } from './organizers/repositories/organizers.repository';
import { MongoDBUsersRepository } from './users/repositories/users.repository';
import { KdbAPI } from './KdbAPI';

// TODO: Refactor young padawan!

const log: debug.IDebugger = debug('app:main');

const app = express();

// TODO: make Dependency Injection visible
Container.get(MongooseService).connectWithRetry();
Container.set('OrganizersRepository', new MongoDBOrganizersRepository(Container.get(MongooseService)));
Container.set('UsersRepository', new MongoDBUsersRepository(Container.get(MongooseService)));


const openapiSpec: string = 'src/openapi/openapi:kdb-api.yml';
const port = process.env.APP_PORT || '3000';

const kdbAPI = new KdbAPI(app,port);

kdbAPI.initLogger();
kdbAPI.initDefaultMiddleware();
kdbAPI.registerOpenApi(openapiSpec);
kdbAPI.registerHealthCheck();

const userRoutes = Container.get(UsersRoutes);
const organizersRoutes = Container.get(OrganizersRoutes);
const authRoutes = Container.get(AuthRoutes);

kdbAPI.registerRoutes(userRoutes);
kdbAPI.registerRoutes(organizersRoutes);
kdbAPI.registerRoutes(authRoutes);

kdbAPI.startServer();

module.exports = app;