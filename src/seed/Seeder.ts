import argon2 from "argon2";

import { Command } from "commander";
import { MongoClient } from "mongodb";
import { MongoDBConnector } from "../common/services/MongoDBConnector";
import { PermissionFlag } from "../resources/auth/middleware/PermissionFlag";
import { generateID } from "../utils/IDUtil";

class Seeder {
	public mongoDBConnector: MongoDBConnector | null = null;

	public async initDatabase() {
		const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
		const mongoClient = new MongoClient(uri);

		const mongoDBConnector = new MongoDBConnector(mongoClient);
		await mongoDBConnector.initIndex();

		process.on("exit", async function () {
			console.log("Connection to MongoDB terminated.");
			await mongoClient.close();
		});
	}

	public async addAdmin(email: string, password: string) {
		await this.addUserWithPermission(email, password, PermissionFlag.ADMIN);
	}

	public async addUser(email: string, password: string) {
		await this.addUserWithPermission(email, password, PermissionFlag.USER);
	}

	private async addUserWithPermission(email: string, password: string, permission: PermissionFlag) {
		if (!this.mongoDBConnector) {
			await this.initDatabase();
		}
		if (!this.mongoDBConnector) {
			console.log("MongoDb not reachable");
			return;
		}

		password = await argon2.hash(password);
		const user = {
			email: email.toLowerCase(),
			password: password,
			permissionFlags: permission,
			identifier: generateID(),
		};
		const users = await this.mongoDBConnector.users();
		if ((await users.insertOne(user)).acknowledged) {
			console.log(`User ${user.email} with identifier ${user.identifier} added`);
		} else {
			console.log(`Warning: No user with identifier with email ${user.email} added`);
		}
	}

	public addTags(): boolean {
		return false;
	}
}

const program = new Command();

program
	.option("-t, --tags", "If no tags are present, the default tags will be written to the DB")
	.option(
		"-a, --admin <mailAndPassword>",
		"If no admin is present in the DB, an admin with the provided email and password will be created. Format: email:password (e.g. admin@example.com:password123)."
	)
	.option(
		"-u, --user <mailAndPassword>",
		"If no user is present in the DB, a user with the provided email and password will be createdFormat: email:password (e.g. user@example.com:password123)."
	);

program.parse(process.argv);

const options = program.opts();

const seeder = new Seeder();

if (options.admin) {
	const [mail, password] = options.admin.split(":");
	(async () => {
		await seeder.addAdmin(mail, password);	})();
}

if (options.tags) {
	console.log("Tags option is set");
}

console.log("SEED END");
