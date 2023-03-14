import express from 'express';
import cors from 'cors';

export function registerMiddleware(app: express.Application) {
	app.use(express.json());
	app.use(cors());
}