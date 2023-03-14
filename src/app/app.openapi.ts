import swaggerUi from 'swagger-ui-express';
import express from 'express';
import YAML from 'yamljs';
import * as OpenApiValidator from 'express-openapi-validator';

export function registerOpenApi(app: express.Application,openapiSpec: string, preRoute: string = '') {
	const swaggerDocument = YAML.load(openapiSpec);
	app.use(`${preRoute}/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	app.use(`${preRoute}/v1/spec`, express.static(openapiSpec));
	app.use(
		OpenApiValidator.middleware({
			apiSpec: openapiSpec,
			validateRequests: true,
			validateResponses: true,
		})
	);
}