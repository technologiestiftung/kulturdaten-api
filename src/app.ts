import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import ip from 'ip';

import debug from 'debug';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { OrganizersRoutes } from './organizers/organizers.routes';
import Container from 'typedi';
import { UsersRoutes } from './users/users.routes';
import { AuthPassword } from './auth/strategies/auth.strategy.password';
import { UsersService } from './users/services/users.service';
import passport from 'passport';
import { AuthBearerJWT } from './auth/strategies/auth.strategy.bearerjwt';
import { MongooseService } from "./common/services/mongoose.service";
import { MongoDBOrganizersRepository } from "./organizers/repositories/organizers.repository";
import { MongoDBUsersRepository } from "./users/repositories/users.repository";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';
import { HealthRoutes } from './health/health.routes';
import { AuthRoutes } from './auth/auth.routes';


const log: debug.IDebugger = debug('app:main');

class KulturdatenBerlinApp {

	constructor(public app: express.Application) { }

	public port = process.env.APP_PORT || '5000';
	public openAPISpec: string = 'src/openapi/openapi:kdb-api.yml';
	public runningMessage = `Server running at ${ip.address()}:${this.port}`;
	public documentationMessage = `You can find the api documentation at ${ip.address()}:${this.port}/v1/docs/`

	public ini() {
		this.initDependencyInjection();
		this.initLogger();
		this.initAuthStrategies();
 		this.registerDefaultMiddleware();
		// this.registerOpenApi();
		this.registerStatusChecks();
		this.registerErrorHandler();
	}

	public registerRoutes() {
		this.registerAuthRoutes();

		this.registerOrganizerRoutes();
		this.registerUserRoutes();
	}

	public start() {
		this.app.listen(this.port, () => {
			console.log(this.runningMessage);
			console.log(this.documentationMessage);
		});
	}

	private initDependencyInjection() {
		// TODO: make Dependency Injection visible
		Container.get(MongooseService).connectWithRetry();
		Container.set('OrganizersRepository', new MongoDBOrganizersRepository(Container.get(MongooseService)));
		Container.set('UsersRepository', new MongoDBUsersRepository(Container.get(MongooseService)));
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
		this.app.use(`/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		this.app.use(`/v1/spec`, express.static(this.openAPISpec));
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
		this.app.use('/v1/health', healthRoutes.getRouter());
	}

	private registerAuthRoutes() {
		const authRoutes = Container.get(AuthRoutes);
		this.app.use('/v1/auth',
		authRoutes.getRouter());
	}

	private registerOrganizerRoutes() {
		const organizersRoute = Container.get(OrganizersRoutes);
		this.app.use('/v1/organizers', organizersRoute.getRouter());
	}

	private registerUserRoutes() {
		const usersRoute = Container.get(UsersRoutes);
		this.app.use('/v1/users', usersRoute.getRouter());
	}

}

const app = express();
const kulturdatenBerlin = new KulturdatenBerlinApp(app);

kulturdatenBerlin.ini();
kulturdatenBerlin.registerRoutes();
kulturdatenBerlin.start();