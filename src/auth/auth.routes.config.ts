import { CommonRoutesConfig } from '../common/common.routes.config';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtMiddleware } from './middleware/jwt.middleware';
import express  from 'express';
import { Service } from 'typedi';

@Service()
export class AuthRoutes extends CommonRoutesConfig {
	constructor( 
		public authController: AuthController,
		public jwtMiddleware: JwtMiddleware, 
		public authMiddleware: AuthMiddleware) {
		super('AuthRoutes');
	}

	configureRoutes(app: express.Application, preRoute: string): express.Application {
		app.route(`${preRoute}/v1/auth`)
			.post(
				(req, res, next) => this.authMiddleware.verifyUserPassword(req,res,next),
				(req, res, next) => this.authController.createJWT(req, res)
			);

		app.route(`${preRoute}/v1/auth/refresh-token`)
			.post(
				(req, res, next) => this.jwtMiddleware.validJWTNeeded(req,res,next),
				(req, res, next) => this.jwtMiddleware.verifyRefreshBodyField(req,res,next),
				(req, res, next) => this.jwtMiddleware.validRefreshNeeded(req,res,next),
				(req, res, next) => this.authController.createJWT(req,res),
			);
		return app;
	}

}