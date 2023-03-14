import 'reflect-metadata';
import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import ip from 'ip';

import debug from 'debug';

import { initDependencyInjection } from './app/app.dependency.injection';
import { registerOpenApi } from './app/app.openapi';
import { initLogger } from './app/app.logger';
import { registerMiddleware } from './app/app.middleware';
import { registerHealthCheck } from './app/app.health';
import { registerErrorHandler } from './app/app.errorhandler';
import { registerRoutes } from './app/app.routes';

// TODO: Refactor young padawan!

const log: debug.IDebugger = debug('app:main');

export const app = express();
const port = process.env.APP_PORT || '5000';
const openAPISpec: string = 'src/openapi/openapi:kdb-api.yml';
const runningMessage = `Server running at ${ip.address()}:${port}`;
const documentationMessage = `You can find the api documentation at ${ip.address()}:${port}/v1/docs/`

initDependencyInjection();
initLogger(app);

registerOpenApi(app, openAPISpec);
registerMiddleware(app);
registerHealthCheck(app, port);
registerErrorHandler(app);

registerRoutes(app);

startApp();


export function startApp() {
	app.listen(port,() => {
		console.log(runningMessage);
		console.log(documentationMessage);
	});
}