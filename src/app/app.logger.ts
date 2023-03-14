import debug from 'debug';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { Application } from 'express';

export function initLogger(app: Application) {

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

	app.use(expressWinston.logger(loggerOptions));
}
