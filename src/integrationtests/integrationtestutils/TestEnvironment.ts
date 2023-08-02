import { MongoClient, Collection, Db } from "mongodb";
import { MongoDBConnector } from "../../common/services/mongodb.service";
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import { EventsController } from "../../resources/events/controllers/events.controller";
import { EventsRoutes } from "../../resources/events/events.routes";
import { MongoDBEventsRepository } from "../../resources/events/repositories/events.repository.mongodb";
import { EventsService } from "../../resources/events/services/events.service";
import { LocationsController } from "../../resources/locations/controllers/locations.controller";
import { LocationsRoutes } from "../../resources/locations/locations.routes";
import { LocationsService } from "../../resources/locations/services/locations.service";
import { MongoDBLocationsRepository } from "../../resources/locations/repositories/locations.repository.mongodb";
import { OrganizationsController } from "../../resources/organizations/controllers/organizations.controller";
import { OrganizationsRoutes } from "../../resources/organizations/organizations.routes";
import { MongoDBOrganizationsRepository } from "../../resources/organizations/repositories/organizations.repository.mongodb";
import { OrganizationsService } from "../../resources/organizations/services/organizations.service";
import { AttractionsRoutes } from "../../resources/attractions/attractions.routes";
import { AttractionsController } from "../../resources/attractions/controllers/attractions.controller";
import { MongoDBAttractionsRepository } from "../../resources/attractions/repositories/attractions.repository.mongodb";
import { AttractionsService } from "../../resources/attractions/services/attractions.service";

export class TestEnvironment {


	con!: MongoClient;
	mongoServer!: MongoMemoryServer;
	connector!: MongoDBConnector;
	app!: express.Application;
	db!: Db;

	events!: Collection;
	EVENTS_ROUTE = '/events';

	locations!: Collection;
	LOCATIONS_ROUTE = '/locations';

	organizations!: Collection;
	ORGANIZATIONS_ROUTE = '/organizations';

	attractions!: Collection;
	ATTRACTIONS_ROUTE = '/attractions';

	async startServer(): Promise<TestEnvironment> {
		this.mongoServer = await MongoMemoryServer.create();
		process.env.MONGO_URI = this.mongoServer.getUri();
		this.con = await MongoClient.connect(this.mongoServer.getUri(), {});
		this.connector = new MongoDBConnector(this.con);
		this.db = this.con.db('api-db');
		this.app = express();
		this.app.use(express.json());

		return this;
	}

	withEventsRoutes(): TestEnvironment {
		const eventsRepository = new MongoDBEventsRepository(this.connector);
		const eventsService = new EventsService(eventsRepository);
		const eventsController = new EventsController(eventsService);
		const eventsRoutes = new EventsRoutes(eventsController);
		this.events = this.db.collection('events');
		this.app.use(this.EVENTS_ROUTE, eventsRoutes.getRouter());

		return this;
	}

	withLocationsRoutes(): TestEnvironment {
		const locationsRepository = new MongoDBLocationsRepository(this.connector);
		const locationsService = new LocationsService(locationsRepository);
		const locationsController = new LocationsController(locationsService);
		const locationsRoutes = new LocationsRoutes(locationsController);
		this.locations = this.db.collection('locations');
		this.app.use(this.LOCATIONS_ROUTE, locationsRoutes.getRouter());

		return this;
	}

	withOrganizationsRoutes(): TestEnvironment {
		const organizationsRepository = new MongoDBOrganizationsRepository(this.connector);
		const organizationsService = new OrganizationsService(organizationsRepository);
		const organizationsController = new OrganizationsController(organizationsService);
		const organizationsRoutes = new OrganizationsRoutes(organizationsController);
		this.organizations = this.db.collection('organizations');
		this.app.use(this.ORGANIZATIONS_ROUTE, organizationsRoutes.getRouter());

		return this;
	}

	withAttractionsRoutes(): TestEnvironment {
		const attractionsRepository = new MongoDBAttractionsRepository(this.connector);
		const attractionsService = new AttractionsService(attractionsRepository);
		const attractionsController = new AttractionsController(attractionsService);
		const attractionsRoutes = new AttractionsRoutes(attractionsController);
		this.attractions = this.db.collection('attractions');
		this.app.use(this.ATTRACTIONS_ROUTE, attractionsRoutes.getRouter());

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
