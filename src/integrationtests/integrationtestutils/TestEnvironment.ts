import express from "express";
import { Collection, Db, MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import passport from "passport";
import * as bearerStrategy from "passport-http-bearer";
import { MongoDBConnector } from "../../common/services/MongoDBConnector";
import { AttractionsRoutes } from "../../resources/attractions/AttractionsRoutes";
import { AttractionsController } from "../../resources/attractions/controllers/AttractionsController";
import { AttractionsRepository } from "../../resources/attractions/repositories/AttractionsRepository";
import { MongoDBAttractionsRepository } from "../../resources/attractions/repositories/MongoDBAttractionsRepository";
import { AttractionsService } from "../../resources/attractions/services/AttractionsService";
import { PermissionFlag } from "../../resources/auth/middleware/PermissionFlag";
import { EventsRoutes } from "../../resources/events/EventsRoutes";
import { EventsController } from "../../resources/events/controllers/EventsController";
import { EventsRepository } from "../../resources/events/repositories/EventsRepository";
import { MongoDBEventsRepository } from "../../resources/events/repositories/MongoDBEventsRepository";
import { EventsService } from "../../resources/events/services/EventsService";
import { LocationsRoutes } from "../../resources/locations/LocationsRoutes";
import { LocationsController } from "../../resources/locations/controllers/LocationsController";
import { LocationsRepository } from "../../resources/locations/repositories/LocationsRepository";
import { MongoDBLocationsRepository } from "../../resources/locations/repositories/MongoDBLocationsRepository";
import { LocationsService } from "../../resources/locations/services/LocationsService";
import { OrganizationsRoutes } from "../../resources/organizations/OrganizationsRoutes";
import { OrganizationsController } from "../../resources/organizations/controllers/OrganizationsController";
import { MongoDBOrganizationsRepository } from "../../resources/organizations/repositories/MongoDBOrganizationsRepository";
import { OrganizationsRepository } from "../../resources/organizations/repositories/OrganizationsRepository";
import { OrganizationsService } from "../../resources/organizations/services/OrganizationsService";
import { UsersRepository } from "../../resources/users/repositories/UsersRepository";
import { UsersService } from "../../resources/users/services/UsersService";
import { MongoDBUsersRepository } from "../../resources/users/repositories/MongoDBUsersRepository";

export class TestEnvironment {
	ADMIN_TOKEN: string = JSON.stringify({
		id: "adminID",
		email: "admin@email.de",
		permissionFlags: PermissionFlag.ADMIN_PERMISSION,
		organizationIdentifier: "O_org_1",
		role: "admin",
	});
	USER_TOKEN: string = JSON.stringify({
		id: "userID",
		email: "user@email.de",
		permissionFlags: PermissionFlag.REGISTERED_USER,
		organizationIdentifier: "O_org_1",
		role: "admin",
	});
	WRONG_TOKEN: string = "WRONG_TOKEN";

	con!: MongoClient;
	mongoServer!: MongoMemoryServer;
	connector!: MongoDBConnector;
	app!: express.Application;
	db!: Db;

	eventsRepository!: EventsRepository;
	eventsService!: EventsService;
	eventsController!: EventsController;
	eventsRoutes!: EventsRoutes;
	events!: Collection;
	EVENTS_ROUTE = "/events";

	locationsRepository!: LocationsRepository;
	locationsService!: LocationsService;
	locationsController!: LocationsController;
	locationsRoutes!: LocationsRoutes;
	locations!: Collection;
	LOCATIONS_ROUTE = "/locations";

	organizationsRepository!: OrganizationsRepository;
	organizationsService!: OrganizationsService;
	organizationsController!: OrganizationsController;
	organizationsRoutes!: OrganizationsRoutes;
	organizations!: Collection;
	ORGANIZATIONS_ROUTE = "/organizations";

	attractionsRepository!: AttractionsRepository;
	attractionsService!: AttractionsService;
	attractionsController!: AttractionsController;
	attractionsRoutes!: AttractionsRoutes;
	attractions!: Collection;
	ATTRACTIONS_ROUTE = "/attractions";

	usersRepository!: UsersRepository;
	usersService!: UsersService;
	users!: Collection;

	async startServer(): Promise<TestEnvironment> {
		this.mongoServer = await MongoMemoryServer.create();
		process.env.MONGO_URI = this.mongoServer.getUri();
		this.con = await MongoClient.connect(this.mongoServer.getUri(), {});
		this.connector = new MongoDBConnector(this.con);
		this.db = this.con.db("api-db");
		this.initPassport();
		this.app = express();
		this.app.use(express.json());

		return this;
	}

	withEventsRoutes(): TestEnvironment {
		this.eventsRepository = new MongoDBEventsRepository(this.connector);
		this.eventsService = new EventsService(this.eventsRepository);
		this.eventsController = new EventsController(this.eventsService);
		this.eventsRoutes = new EventsRoutes(this.eventsController);
		this.events = this.db.collection("events");
		this.app.use("/", this.eventsRoutes.getRouter());

		return this;
	}

	withLocationsRoutes(): TestEnvironment {
		this.locationsRepository = new MongoDBLocationsRepository(this.connector);
		this.locationsService = new LocationsService(this.locationsRepository);
		this.locationsController = new LocationsController(this.locationsService);
		this.locationsRoutes = new LocationsRoutes(this.locationsController);
		this.locations = this.db.collection("locations");
		this.app.use("/", this.locationsRoutes.getRouter());

		return this;
	}

	withOrganizationsRoutes(): TestEnvironment {
		this.usersRepository = new MongoDBUsersRepository(this.connector);
		this.usersService = new UsersService(this.usersRepository);
		this.users = this.db.collection("users");

		this.organizationsRepository = new MongoDBOrganizationsRepository(this.connector);
		this.organizationsService = new OrganizationsService(this.organizationsRepository);
		this.organizationsController = new OrganizationsController(this.organizationsService, this.usersService);
		this.organizationsRoutes = new OrganizationsRoutes(this.organizationsController);
		this.organizations = this.db.collection("organizations");
		this.app.use("/", this.organizationsRoutes.getRouter());

		return this;
	}

	withAttractionsRoutes(): TestEnvironment {
		this.attractionsRepository = new MongoDBAttractionsRepository(this.connector);
		this.attractionsService = new AttractionsService(this.attractionsRepository, this.eventsRepository);
		this.attractionsController = new AttractionsController(this.attractionsService);
		this.attractionsRoutes = new AttractionsRoutes(this.attractionsController);
		this.attractions = this.db.collection("attractions");
		this.app.use("/", this.attractionsRoutes.getRouter());

		return this;
	}

	initPassport(): TestEnvironment {
		const WRONG_TOKEN = this.WRONG_TOKEN;
		passport.use(
			"authenticated-user",
			new bearerStrategy.Strategy(async function verify(token, done) {
				if (token === WRONG_TOKEN) {
					return done(null, false);
				}
				return done(null, JSON.parse(token));
			}),
		);
		return this;
	}

	withNoLoggedInUser(): TestEnvironment {
		passport.use(
			"authenticated-user",
			new bearerStrategy.Strategy(async function verify(token, done) {
				return done(null, false);
			}),
		);
		return this;
	}

	async stopServer() {
		if (this.con) {
			await this.con.close();
		}
		if (this.mongoServer) {
			await this.mongoServer.stop();
		}
		if (this.connector) {
			await this.connector.close();
		}
	}
}
