import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import * as expressWinston from "express-winston";
import ip from "ip";
import { MongoClient } from "mongodb";
import passport from "passport";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import Container from "typedi";
import * as winston from "winston";
import YAML from "yamljs";
import { MongoDBConnector } from "./common/services/MongoDBConnector";
import { HarvesterRoutes } from "./harvester/HarvesterRoutes";
import { AttractionsRoutes } from "./resources/attractions/AttractionsRoutes";
import { MongoDBAttractionsRepository } from "./resources/attractions/repositories/MongoDBAttractionsRepository";
import { AuthRoutes } from "./resources/auth/AuthRoutes";
import { AuthBearerJWTStrategy } from "./resources/auth/strategies/AuthBearerJWTStrategy";
import { AuthPasswordStrategy } from "./resources/auth/strategies/AuthPasswordStrategy";
import { EventsRoutes } from "./resources/events/EventsRoutes";
import { FindEventsByAttractionTagFilterStrategy } from "./resources/events/filter/implementations/FindEventsByAttractionTagFilterStrategy";
import { FindEventsByMongoDBFilterStrategy } from "./resources/events/filter/implementations/FindEventsByMongoDBFilterStrategy";
import { FindInTheFutureEventsFilterStrategy } from "./resources/events/filter/implementations/FindInTheFutureEventsFilterStrategy";
import { MongoDBEventsRepository } from "./resources/events/repositories/MongoDBEventsRepository";
import { HealthRoutes } from "./resources/health/HealthRoutes";
import { LocationsRoutes } from "./resources/locations/LocationsRoutes";
import { MongoDBLocationsRepository } from "./resources/locations/repositories/MongoDBLocationsRepository";
import { OrganizationsRoutes } from "./resources/organizations/OrganizationsRoutes";
import { MongoDBOrganizationsRepository } from "./resources/organizations/repositories/MongoDBOrganizationsRepository";
import { MongoDBTagsRepository } from "./resources/tags/repositories/MongoDBTagsRepository";
import { TagsRoutes } from "./resources/tags/tags.routes";
import { UsersRoutes } from "./resources/users/UsersRoutes";
import { MongoDBUsersRepository } from "./resources/users/repositories/MongoDBUsersRepository";
import { UsersService } from "./resources/users/services/UsersService";

dotenv.config();

export class KulturdatenBerlinApp {
	constructor(public app: express.Application) {}

	public port = process.env.APP_PORT || "5000";
	public openAPISpec: string = "src/schemas/kulturdaten.berlin.openapi.generated.yml";
	public runningMessage = `Server running at ${ip.address()}:${this.port}`;
	public documentationMessage = `You can find the api documentation at ${ip.address()}:${this.port}/api/docs/`;
	public dataBaseClient: MongoClient | null = null;

	public async start() {
		await this.ini();
		this.registerRoutes();
		this.app.listen(this.port, () => {
			console.log(this.runningMessage);
			console.log(this.documentationMessage);
		});
	}

	public async ini() {
		this.initDataBaseConnection();
		await this.initDependencyInjection();
		this.initLogger();
		this.initAuthStrategies();
		this.registerDefaultMiddleware();
		this.registerOpenApi();
		this.registerStatusChecks();
		this.registerErrorHandler();
	}

	public registerRoutes() {
		this.registerAuthRoutes();
		this.registerOrganizationRoutes();
		this.registerUserRoutes();
		this.registerEventsRoutes();
		this.registerLocationsRoutes();
		this.registerTagsRoutes();
		this.registerHarvesterRoutes();
		this.registerAttractionsRoutes();
	}

	private initDataBaseConnection() {
		const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
		this.dataBaseClient = new MongoClient(uri);
		const cl = this.dataBaseClient;
		process.on("exit", async function () {
			console.log("Connection to MongoDB terminated.");

			await cl.close();
		});
	}

	private async initDependencyInjection() {
		// TODO: make all Dependency Injections visible
		if (this.dataBaseClient) {
			const mongoDBConnector = new MongoDBConnector(this.dataBaseClient);
			await mongoDBConnector.initIndex();
			Container.set("Database", mongoDBConnector);
		}
		Container.set("OrganizationsRepository", new MongoDBOrganizationsRepository(Container.get("Database")));
		Container.import([]);

		Container.set("UsersRepository", new MongoDBUsersRepository(Container.get("Database")));
		Container.import([]);

		Container.set("EventsRepository", new MongoDBEventsRepository(Container.get("Database")));
		Container.import([
			FindEventsByMongoDBFilterStrategy,
			FindEventsByAttractionTagFilterStrategy,
			FindInTheFutureEventsFilterStrategy,
		]);

		Container.set("LocationsRepository", new MongoDBLocationsRepository(Container.get("Database")));
		Container.import([]);

		Container.set("AttractionsRepository", new MongoDBAttractionsRepository(Container.get("Database")));
		Container.import([]);

		Container.set("TagsRepository", new MongoDBTagsRepository(Container.get("Database")));
		Container.import([]);
	}

	private initLogger() {
		const loggerOptions: expressWinston.LoggerOptions = {
			transports: [new winston.transports.Console()],
			format: winston.format.combine(
				winston.format.json(),
				winston.format.prettyPrint(),
				winston.format.colorize({ level: true }),
			),
		};
		if (!process.env.DEBUG) {
			loggerOptions.meta = false;
		}
		this.app.use(expressWinston.logger(loggerOptions));
	}

	private initAuthStrategies() {
		passport.use("password", AuthPasswordStrategy.getStrategy(Container.get(UsersService)));
		passport.use("authenticated-user", AuthBearerJWTStrategy.getStrategy());
	}

	private registerDefaultMiddleware() {
		this.app.use(express.json());
		this.app.use(cors());
	}

	private registerErrorHandler() {
		this.app.use((err: any, req: express.Request, res: express.Response) => {
			res.status(err.status || 500).json({
				message: err.message,
				errors: err.errors,
			});
		});
	}

	private registerOpenApi() {
		const swaggerDocument = YAML.load(this.openAPISpec);
		this.app.use(`/api/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		this.app.use(`/api/specs/kulturdaten.berlin.openApi.yml`, express.static(this.openAPISpec));
		this.app.use(
			OpenApiValidator.middleware({
				apiSpec: this.openAPISpec,
				validateRequests: true,
				validateResponses: true,
			}),
		);
	}

	private registerStatusChecks() {
		this.app.get("/", (req: express.Request, res: express.Response) => {
			res.status(200).send(this.runningMessage);
		});

		const healthRoutes = Container.get(HealthRoutes);
		this.app.use("/api/health", healthRoutes.getRouter());
	}

	private registerAuthRoutes() {
		const authRoutes = Container.get(AuthRoutes);
		this.app.use("/api/authentication", authRoutes.getRouter());
	}

	private registerOrganizationRoutes() {
		const organizationsRoute = Container.get(OrganizationsRoutes);
		this.app.use("/api/organizations", organizationsRoute.getRouter());
	}

	private registerAttractionsRoutes() {
		const attractionsRoute = Container.get(AttractionsRoutes);
		this.app.use("/api/attractions", attractionsRoute.getRouter());
	}

	private registerUserRoutes() {
		const usersRoute = Container.get(UsersRoutes);
		this.app.use("/api/users", usersRoute.getRouter());
	}

	private registerEventsRoutes() {
		const eventsRoute = Container.get(EventsRoutes);
		this.app.use("/api/events", eventsRoute.getRouter());
	}

	private registerLocationsRoutes() {
		const locationsRoute = Container.get(LocationsRoutes);
		this.app.use("/api/locations", locationsRoute.getRouter());
	}

	private registerTagsRoutes() {
		const tagsRoute = Container.get(TagsRoutes);
		this.app.use("/api/tags", tagsRoute.getRouter());
	}

	private registerHarvesterRoutes() {
		const harvesterRoute = Container.get(HarvesterRoutes);
		this.app.use("/api/admin/harvest/baevents-bezirkskalender", harvesterRoute.getRouter());
	}
}

const app = express();
const kulturdatenBerlin = new KulturdatenBerlinApp(app);

kulturdatenBerlin.start();
