import express from 'express';
import { Container } from 'typedi';

import { UsersRoutes } from '../users/users.routes.config';
import { OrganizersRoutes } from '../organizers/organizers.routes.config';
import { AuthRoutes } from '../auth/auth.routes.config';

export function registerRoutes(app: express.Application, preRoute: string = ''){
	const userRoutes = Container.get(UsersRoutes);
	userRoutes.configureRoutes(app,preRoute);
	const organizersRoutes = Container.get(OrganizersRoutes);
	organizersRoutes.configureRoutes(app,preRoute);
	const authRoutes = Container.get(AuthRoutes);
	authRoutes.configureRoutes(app,preRoute);

}