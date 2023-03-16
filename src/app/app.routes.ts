import express from 'express';
import { Container } from 'typedi';

import { AuthRoutes } from '../auth/auth.routes.config';

export function registerRoutes(app: express.Application, preRoute: string = ''){
	registerAuthRoutes(app,preRoute);
}


export function registerAuthRoutes(app: express.Application, preRoute: string = ''){
	const authRoutes = Container.get(AuthRoutes);
	authRoutes.configureRoutes(app,preRoute);
}