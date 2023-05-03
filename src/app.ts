import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import ip from 'ip';

import debug from 'debug';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { OrganizationsRoutes } from './organizations/organizations.routes';
import Container from 'typedi';
import { UsersRoutes } from './users/users.routes';
import { AuthPassword } from './auth/strategies/auth.strategy.password';
import { UsersService } from './users/services/users.service';
import passport from 'passport';
import { AuthBearerJWT } from './auth/strategies/auth.strategy.bearerjwt';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import { HealthRoutes } from './health/health.routes';
import { AuthRoutes } from './auth/auth.routes';
import { MongoDBConnector } from './common/services/mongodb.service';
import { MongoDBOrganizationsRepository } from './organizations/repositories/organizations.repository.mobgodb';
import { MongoDBUsersRepository } from './users/repositories/users.repository.mobgodb';
import { MongoDBEventsRepository } from './events/repositories/events.repository.mobgodb';
import { EventsRoutes } from './events/events.routes';
import { LocationsRoutes } from './locations/locations.routes';
import { MongoDBLocationsRepository } from './locations/repositories/locations.repository.mobgodb';
import { MongoClient } from 'mongodb';

const log: debug.IDebugger = debug('app:main');

export class KulturdatenBerlinApp {

	constructor(public app: express.Application) { }

	public port = process.env.APP_PORT || '5000';
	public openAPISpec: string = 'src/schemas/kulturdaten.berlin.openapi.generated.yml';
	public runningMessage = `Server running at ${ip.address()}:${this.port}`;
	public documentationMessage = `You can find the api documentation at ${ip.address()}:${this.port}/api/v1/docs/`

	public async ini() {
		this.initDependencyInjection();
		this.initLogger();
		this.initAuthStrategies();
 		this.registerDefaultMiddleware();
		this.registerOpenApi();
		this.registerStatusChecks();
		this.registerErrorHandler();
	}

	public registerRoutes() {
		this.registerAuthRoutes();

		this.registerOrganizationRoutes();
		this.registerUserRoutes();
		this.registerEventsRoutes();
		this.registerLocationsRoutes();
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(this.runningMessage);
			console.log(this.documentationMessage);
		});
	}

	private createDatabaseConnection()  {
		const path = process.env.MONGO_URI || 'localhost';
		const port = process.env.MONGO_PORT || 27017;

		const uri = `mongodb://${path}:${port}`;
		const client =  new MongoClient(uri);

		const db = process.env.MONGO_DB || 'api-db';
		const database = client.db(db);

		console.log('Connection to MongoDB established.');

		process.on('exit', async function () {
			console.log('Connection to MongoDB terminated.');

			await client.close();
		});
		

		return database;
	}

	private initDependencyInjection() {
		// TODO: make all Dependency Injections visible
		let database = this.createDatabaseConnection();
		Container.set('Database', database);
		console.log(JSON.stringify(Container.get('Database')));
		Container.set('OrganizationsRepository', new MongoDBOrganizationsRepository(Container.get('Database')));
		Container.set('UsersRepository', new MongoDBUsersRepository(Container.get('Database')));
		Container.set('EventsRepository', new MongoDBEventsRepository(Container.get('Database')));
		Container.set('LocationsRepository', new MongoDBLocationsRepository(Container.get('Database')));

	}

	private initLogger() {
		const loggerOptions: expressWinston.LoggerOptions = {
			transports: [new winston.transports.Console()],
			format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ level: true })),
		};
		if (!process.env.DEBUG) {
			loggerOptions.meta = false;
		}
		this.app.use(expressWinston.logger(loggerOptions));
	}

	private initAuthStrategies() {
		passport.use('password', AuthPassword.getStrategy(Container.get(UsersService)));
		passport.use('authenticated-user', AuthBearerJWT.getStrategy());
	}

	private registerDefaultMiddleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	private registerErrorHandler() {
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.status(err.status || 500).json({
				message: err.message,
				errors: err.errors,
			});
		});
	}

	private registerOpenApi() {
		const swaggerDocument = YAML.load(this.openAPISpec);
		this.app.use(`/api/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		this.app.use(`/api/v1/specs/kulturdaten.berlin.openApi.yml`, express.static(this.openAPISpec));
		this.app.use(OpenApiValidator.middleware({
			apiSpec: this.openAPISpec,
			validateRequests: true,
			validateResponses: true,
		}));
	}

	private registerStatusChecks() {
		this.app.get('/', (req: express.Request, res: express.Response) => {
			let myIp = ip.address();
			res.status(200).send(this.runningMessage + `${myIp}:${this.port}`);
		});

		const healthRoutes = Container.get(HealthRoutes);
		this.app.use('/api/v1/health', healthRoutes.getRouter());
	}

	private registerAuthRoutes() {
		const authRoutes = Container.get(AuthRoutes);
		this.app.use('/api/v1/auth',
		authRoutes.getRouter());
	}

	private registerOrganizationRoutes() {
		const organizationsRoute = Container.get(OrganizationsRoutes);
		this.app.use('/api/v1/organizations', organizationsRoute.getRouter());
	}

	private registerUserRoutes() {
		const usersRoute = Container.get(UsersRoutes);
		this.app.use('/api/v1/users', usersRoute.getRouter());
	}

	private registerEventsRoutes() {
		const eventsRoute = Container.get(EventsRoutes);
		this.app.use('/api/v1/events', eventsRoute.getRouter());
	}

	private registerLocationsRoutes() {
		const locationsRoute = Container.get(LocationsRoutes);
		this.app.use('/api/v1/locations', locationsRoute.getRouter());
	}
}

const app = express();
const kulturdatenBerlin = new KulturdatenBerlinApp(app);

kulturdatenBerlin.ini();
kulturdatenBerlin.registerRoutes();
kulturdatenBerlin.start();


  