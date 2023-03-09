import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import ip from 'ip';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import debug from 'debug';
import * as OpenApiValidator from 'express-openapi-validator';

const log: debug.IDebugger = debug('app:main');

export class KdbAPI {

	routes: CommonRoutesConfig[] = [];
	debugLog: debug.IDebugger | null = null;
	server: http.Server | null = null;
	runningMessage = `Server running at `;

	constructor(public app: express.Application, public port: string) { };

	initLogger() {
		this.debugLog = debug('app');
		const loggerOptions: expressWinston.LoggerOptions = {
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.colorize({ all: true })
			),
		};

		if (!process.env.DEBUG) {
			loggerOptions.meta = false;
		}

		this.app.use(expressWinston.logger(loggerOptions));
	}

	initDefaultMiddleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	registerOpenApi(openapiSpec: string, preRoute: string = '') {
		const swaggerDocument = YAML.load(openapiSpec);
		this.app.use(`${preRoute}/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		this.app.use(`${preRoute}/v1/spec`, express.static(openapiSpec));
		this.app.use(
			OpenApiValidator.middleware({
				apiSpec: openapiSpec,
				validateRequests: true,
				validateResponses: true,
			})
		);
	}

	registerErrorHandler() {
		this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.status(err.status || 500).json({
				message: err.message,
				errors: err.errors,
			});
		});
	}

	registerRoutes(routesConfig: CommonRoutesConfig, preRoute: string = '') {
		this.routes.push(routesConfig);
		routesConfig.configureRoutes(this.app, preRoute);
	}

	registerHealthCheck() {
		this.app.get('/', (req: express.Request, res: express.Response) => {
			let myIp = ip.address();
			res.status(200).send(this.runningMessage + `${myIp}:${this.port}`);
		});
	}

	startServer() {
		this.server = http.createServer(this.app);
		this.server?.listen(this.port, () => {
			this.routes.forEach((route: CommonRoutesConfig) => {
				log(`Routes configured for ${route.getName()}`);
			});
			let myIp = ip.address();
			console.log(this.runningMessage + `${myIp}:${this.port}`);
		});
	}
}
