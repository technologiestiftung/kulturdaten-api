import express from 'express';

export function registerErrorHandler(app: express.Application) {
	app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
		res.status(err.status || 500).json({
			message: err.message,
			errors: err.errors,
		});
	});
}