import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import ip from 'ip';

import debug from 'debug';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { OrganizationsRoutes } from './resources/organizations/organizations.routes';
import Container from 'typedi';
import { UsersRoutes } from './resources/users/users.routes';
import { AuthPassword } from './resources/auth/strategies/auth.strategy.password';
import { UsersService } from './resources/users/services/users.service';
import passport from 'passport';
import { AuthBearerJWT } from './resources/auth/strategies/auth.strategy.bearerjwt';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import { HealthRoutes } from './resources/health/health.routes';
import { AuthRoutes } from './resources/auth/auth.routes';
import { MongoDBConnector } from './common/services/mongodb.service';
import { MongoDBOrganizationsRepository } from './resources/organizations/repositories/organizations.repository.mongodb';
import { MongoDBUsersRepository } from './resources/users/repositories/users.repository.mongodb';
import { MongoDBEventsRepository } from './resources/events/repositories/events.repository.mongodb';
import { EventsRoutes } from './resources/events/events.routes';
import { LocationsRoutes } from './resources/locations/locations.routes';
import { MongoDBLocationsRepository } from './resources/locations/repositories/locations.repository.mongodb';
import { MongoClient } from 'mongodb';
import { HarvesterRoutes } from './harvester/harvester.routes';
import { LocationsService } from './resources/locations/services/locations.service';
import { AttractionsRoutes } from './resources/attractions/attractions.routes';
import { MongoDBAttractionsRepository } from './resources/attractions/repositories/attractions.repository.mongodb';
import { MongoDBTagsRepository } from './resources/tags/repositories/tags.repository.mongodb';
import { TagsRoutes } from './resources/tags/tags.routes';

const log: debug.IDebugger = debug('app:main');

export class KulturdatenBerlinApp {

	constructor(public app: express.Application) { }

	public port = process.env.APP_PORT || '5000';
	public openAPISpec: string = 'src/schemas/kulturdaten.berlin.openapi.generated.yml';
	public runningMessage = `Server running at ${ip.address()}:${this.port}`;
	public documentationMessage = `You can find the api documentation at ${ip.address()}:${this.port}/api/docs/`
	public dataBaseClient : MongoClient | null = null;
	
	public async start() {
		await this.ini();
		this.registerRoutes();
		this.app.listen(this.port, () => {
			console.log(this.runningMessage);
			console.log(this.documentationMessage);
		});
	}

	public async ini() {
		this.initDataBaseConnection();
		await this.initDependencyInjection();
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
		this.registerTagsRoutes();
		this.registerHarvesterRoutes();
		this.registerAttractionsRoutes();
	}


	private initDataBaseConnection() {
		const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
		this.dataBaseClient =  new MongoClient(uri);
		const cl = this.dataBaseClient;
		process.on('exit', async function () {
			console.log('Connection to MongoDB terminated.');

			await cl.close();
		});
	}

	private async initDependencyInjection() {
		// TODO: make all Dependency Injections visible
		if(this.dataBaseClient) {
			const mongoDBConnector = new MongoDBConnector(this.dataBaseClient);
			await mongoDBConnector.initIndex();
			Container.set('Database', mongoDBConnector);
		} 
		Container.set('OrganizationsRepository', new MongoDBOrganizationsRepository(Container.get('Database')));
		Container.set('UsersRepository', new MongoDBUsersRepository(Container.get('Database')));
		Container.set('EventsRepository', new MongoDBEventsRepository(Container.get('Database')));
		Container.set('LocationsRepository', new MongoDBLocationsRepository(Container.get('Database')));
		Container.set('AttractionsRepository', new MongoDBAttractionsRepository(Container.get('Database')));
		Container.set('TagsRepository', new MongoDBTagsRepository(Container.get('Database')));

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
		this.app.use(`/api/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		this.app.use(`/api/specs/kulturdaten.berlin.openApi.yml`, express.static(this.openAPISpec));
		this.app.use(OpenApiValidator.middleware({
			apiSpec: this.openAPISpec,
			validateRequests: true,
			validateResponses: true,
		}));
	}

	private registerStatusChecks() {
		this.app.get('/', (req: express.Request, res: express.Response) => {
			res.status(200).send(this.runningMessage);
		});

		const healthRoutes = Container.get(HealthRoutes);
		this.app.use('/api/health', healthRoutes.getRouter());
	}

	private registerAuthRoutes() {
		const authRoutes = Container.get(AuthRoutes);
		this.app.use('/api/auth',
		authRoutes.getRouter());
	}

	private registerOrganizationRoutes() {
		const organizationsRoute = Container.get(OrganizationsRoutes);
		this.app.use('/api/organizations', organizationsRoute.getRouter());
	}

	registerAttractionsRoutes() {
		const attractionsRoute = Container.get(AttractionsRoutes);
		this.app.use('/api/attractions', attractionsRoute.getRouter());
	}

	private registerUserRoutes() {
		const usersRoute = Container.get(UsersRoutes);
		this.app.use('/api/users', usersRoute.getRouter());
	}

	private registerEventsRoutes() {
		const eventsRoute = Container.get(EventsRoutes);
		this.app.use('/api/events', eventsRoute.getRouter());
	}

	private registerLocationsRoutes() {
		const locationsRoute = Container.get(LocationsRoutes);
		this.app.use('/api/locations', locationsRoute.getRouter());
	}

	private registerTagsRoutes() {
		const tagsRoute = Container.get(TagsRoutes);
		this.app.use('/api/tags', tagsRoute.getRouter());
	}

	registerHarvesterRoutes() {
		const harvesterRoute = Container.get(HarvesterRoutes);
		this.app.use('/api/admin/harvest/baevents-bezirkskalender', harvesterRoute.getRouter());
	}
}

const app = express();
const kulturdatenBerlin = new KulturdatenBerlinApp(app);

kulturdatenBerlin.start();


  