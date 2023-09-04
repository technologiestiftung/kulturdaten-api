import debug from "debug";
import { MongoClient } from "mongodb";
import { Service } from "typedi";
import { Attraction } from "../../generated/models/Attraction.generated";
import { Event } from "../../generated/models/Event.generated";
import { Location } from "../../generated/models/Location.generated";
import { Organization } from "../../generated/models/Organization.generated";
import { Tag } from "../../generated/models/Tag.generated";
import { User } from "../../generated/models/User.generated";

const log: debug.IDebugger = debug("app:mongodb-controller");

@Service()
export class MongoDBConnector {
	constructor(public client: MongoClient) {}

	public async events() {
		const db = await this.getDatabase();
		return db.collection<Event>("events");
	}

	public async attractions() {
		const db = await this.getDatabase();
		return db.collection<Attraction>("attractions");
	}

	public async organizations() {
		const db = await this.getDatabase();
		return db.collection<Organization>("organizations");
	}

	public async users() {
		const db = await this.getDatabase();
		return db.collection<User>("users");
	}

	public async locations() {
		const db = await this.getDatabase();
		return db.collection<Location>("locations");
	}

	public async tags() {
		const db = await this.getDatabase();
		return db.collection<Tag>("tags");
	}

	public async getDatabase() {
		const db = process.env.MONGO_DB || "api-db";
		return this.client.db(db);
	}

	public async isHealthy(): Promise<boolean> {
		const adminDB = this.client.db("admin");
		const pingResult = await adminDB.command({ ping: 1 });

		return pingResult.ok === 1;
	}

	public async initIndex() {
		const events = await this.events();
		await events.createIndex({ identifier: 1 }, { name: "id_index" });

		const organizations = await this.organizations();
		await organizations.createIndex({ identifier: 1 }, { name: "id_index" });

		const users = await this.users();
		await users.createIndex({ identifier: 1 }, { name: "id_index" });
		await users.createIndex({ email: 1 }, { name: "email_index" });

		const locations = await this.locations();
		await locations.createIndex({ identifier: 1 }, { name: "id_index" });

		const attractions = await this.attractions();
		await attractions.createIndex({ identifier: 1 }, { name: "id_index" });

		const tags = await this.tags();
		await tags.createIndex({ identifier: 1 }, { name: "id_index" });
	}

	public async close() {
		await this.client.close();
	}
}
