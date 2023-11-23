import * as dotenv from "dotenv";
dotenv.config();

import * as argon2 from "argon2";
import { Command } from "commander";
import { MongoClient } from "mongodb";
import validator from "validator";
import { MongoDBConnector } from "../common/services/MongoDBConnector";
import { Membership } from "../generated/models/Membership.generated";
import { Organization } from "../generated/models/Organization.generated";
import { Tag } from "../generated/models/Tag.generated";
import { User } from "../generated/models/User.generated";
import { PermissionFlag } from "../resources/auth/middleware/PermissionFlag";
import accessibilityTagsJSON from "../seed/accessibility.json";
import tagsJSON from "../seed/tags.json";
import { generateID, generateOrganizationID } from "../utils/IDUtil";
import { createMetadata } from "../utils/MetadataUtil";
import { Borough, schemaForBorough } from "../generated/models/Borough.generated";

let mongoClient: MongoClient;
let mongoDBConnector: MongoDBConnector;

/**
 * Database Initialization Script
 *
 * ---------------------------
 * Accessing Help:
 * ---------------------------
 * To view a list of available commands and their descriptions, use the `-h` or `--help` flag.
 * Example:
 *  npm run seed -- -h
 *
 * ---------------------------
 * Adding Tags:
 * ---------------------------
 * To add tags to the database, utilize the `-t` or `--tags` flag.
 * Example:
 *  npm run seed -- --tags
 *
 * ---------------------------
 * Setting up an Organization:
 * ---------------------------
 * To create a starting organization (TSB) and add the admin as a member with the admin role, use the
 * `-o` or `--organization` flag. The admin user will only be added to this organization if they are created
 * with the same command.
 * Example:
 *  npm run seed -- --organization --admin admin@example.com:password123
 *
 * ---------------------------
 * Creating an Admin User:
 * ---------------------------
 * To introduce an admin user to the database (without an organization), use the `-a` or `--admin` flag.
 * This should be followed by the user's email and password, structured as `email:password`.
 * Example:
 *  npm run seed -- --admin admin@example.com:password123
 *
 * ---------------------------
 * Combined Usage:
 * ---------------------------
 * It's possible to leverage both functionalities within a single command execution.
 * Example:
 *  npm run seed -- --tags --admin admin@example.com:password123
 *
 * ---------------------------
 * Important Note on Script Behavior:
 * ---------------------------
 * This script is designed to populate only empty collections within the database.
 * If a collection already contains data, the script will skip adding new entries to prevent duplicates or unintended overwrites.
 *
 * For security reasons, especially with admin user creation, this behavior ensures that no admin user can be programmatically added
 * if there are already existing users in the system. This minimizes the risk of unauthorized admin creation or potential misuse.
 *
 */

async function main() {
	const program = new Command();

	program
		.option("-t, --tags", "If no tags are present, the default tags will be written to the DB")
		.option(
			"-a, --admin <mailAndPassword>",
			"If no admin is present in the DB, an admin with the provided email and password will be created. Format: email:password (e.g. admin@example.com:password123).",
		)
		.option(
			"-b, --boroughs <defaultPassword>",
			"All Berlin boroughs are created as organizations. An admin account is created for each borough. Format: defaultPassword (e.g. password123).",
		);

	program.parse(process.argv);

	const options = program.opts();

	try {
		await initDatabase();
		let boroughOrganizationIdentifiers: string[] = [];

		if (options.boroughs) {
			boroughOrganizationIdentifiers = await handleBoroughsCreation(options.boroughs);
		}

		if (options.admin) {
			await handleAdminCreation(options.admin, boroughOrganizationIdentifiers);
		}

		if (options.tags) {
			await handleTagInsertion();
		}

		if (mongoClient) {
			await mongoClient.close();
			console.log("Connection to MongoDB closed.");
		}
	} catch (error: any) {
		await mongoClient?.close();
		console.error("The script ended with an error.", error?.message ? error.message : "");
	}
}

async function initDatabase() {
	const uri = process.env.MONGO_URI || "mongodb://localhost:27017";

	try {
		mongoClient = new MongoClient(uri);

		mongoDBConnector = new MongoDBConnector(mongoClient);
		await mongoDBConnector.initIndex();

		console.log("Connection to database established.");
	} catch (error) {
		throw new Error(
			"An error occurred while establishing a connection to MongoDB. Please check the connection settings and try again.",
		);
	}
}

async function areOrganizationsAvailable() {
	const organizations = await mongoDBConnector.organizations();
	return (await organizations.countDocuments()) > 0;
}

async function addBoroughOffices(defaultPassword: string) {
	const boroughOrganizationIdentifiers: string[] = [];
	const userCreationPromises = schemaForBorough.enum.map(async (borough) => {
		if (borough === "außerhalb") {
			return;
		}
		const boroughOrganizationIdentifier = await addBorough(borough as Borough);
		if (boroughOrganizationIdentifier) {
			boroughOrganizationIdentifiers.push(boroughOrganizationIdentifier);
			const boroughMail = generateBoroughMail(borough);
			return addUserWithPermission(boroughMail, defaultPassword, PermissionFlag.REGISTERED_USER, [
				boroughOrganizationIdentifier,
			]);
		}
	});

	await Promise.all(userCreationPromises);
	return boroughOrganizationIdentifiers;
}

function generateBoroughMail(borough: string) {
	let email = borough.toLowerCase();
	email = email.replace(/ä/g, "ae");
	email = email.replace(/ö/g, "oe");
	email = email.replace(/ü/g, "ue");
	email = email.replace(/ß/g, "ss");

	return `bezirksamt-${email}@kulturdaten.berlin`;
}

async function areTagsAvailable() {
	const tags = await mongoDBConnector.tags();
	return (await tags.countDocuments()) > 0;
}

async function addTags() {
	await addTagsToDatabase(tagsJSON, "CategoryTags have been added.");
}

async function addAccessibilityTags() {
	await addTagsToDatabase(accessibilityTagsJSON, "AccessibilityTags have been added.");
}

async function addTagsToDatabase(tagsData: typeof tagsJSON | typeof accessibilityTagsJSON, logMessage: string) {
	const db = await mongoDBConnector.getDatabase();
	const tags = db.collection("tags");
	const tagsToAdd: Tag[] = tagsData.map((tag) => ({
		...tag,
		type: "type.Tag",
		metadata: {
			...tag.metadata,
			...createMetadata(),
		},
	}));
	await tags.insertMany(tagsToAdd);

	console.log(logMessage);
}

async function isAdminUserPresent() {
	const users = await mongoDBConnector.users();
	const admins = await users.countDocuments({ permissionFlags: PermissionFlag.ADMIN_PERMISSION });
	return admins > 0;
}

async function addAdmin(email: string, password: string, boroughOrganizationIdentifiers: string[]) {
	await addUserWithPermission(email, password, PermissionFlag.ADMIN_PERMISSION, boroughOrganizationIdentifiers);
}

async function addBorough(borough: Borough) {
	const boroughOrganizationIdentifier = generateOrganizationID();
	const metadata = createMetadata();
	const organizations = await mongoDBConnector.organizations();
	const organization: Organization = {
		type: "type.Organization",
		identifier: boroughOrganizationIdentifier,
		metadata: {
			...metadata,
			origin: "seed",
		},
		status: "organization.published",
		activationStatus: "organization.active",
		title: {
			de: "Bezirksamt " + borough,
		},
		inLanguages: ["de"],
		borough: borough,
	};
	const result = await organizations.insertOne(organization);
	if (result.acknowledged) {
		console.log(`"Bezirksamt ${borough}" with identifier ${organization.identifier} added`);
		return organization.identifier;
	} else {
		console.log(`Warning: No "Bezirksamt ${borough}" added`);
		return null;
	}
}

async function addUserWithPermission(
	email: string,
	password: string,
	permission: PermissionFlag,
	organizationIdentifiers: string[],
) {
	if (!validator.isEmail(email)) {
		console.log("Email is not valid: No user added");
		return;
	}

	const hashedPassword = await argon2.hash(password);
	const metadata = createMetadata();
	const user: User = {
		type: "User",
		email: email.toLowerCase(),
		password: hashedPassword,
		permissionFlags: permission,
		identifier: generateID(),
		createdAt: metadata.created,
		updatedAt: metadata.updated,
		memberships: generateMemberships(organizationIdentifiers),
	};
	const users = await mongoDBConnector.users();
	const result = await users.insertOne(user);

	if (result.acknowledged) {
		console.log(`User ${user.email} with identifier ${user.identifier} added`);
	} else {
		console.log(`Warning: No user with identifier with email ${user.email} added`);
	}
}

function generateMemberships(organizationIdentifier: string[]): Membership[] {
	if (!organizationIdentifier) {
		return [];
	}
	const memberships: Membership[] = [];
	organizationIdentifier.forEach((organizationIdentifier) => {
		memberships.push({
			organizationIdentifier,
			role: "admin",
		});
	});
	return memberships;
}

async function handleBoroughsCreation(option: string): Promise<string[]> {
	if (await areOrganizationsAvailable()) {
		console.log(
			"There are already organizations in the database. Therefore, no new borough organization can be created.",
		);
		return [];
	}
	return await addBoroughOffices(option);
}

async function handleAdminCreation(option: string, boroughOrganizationIdentifiers: string[]) {
	if (await isAdminUserPresent()) {
		console.log("There is already an admin in the database. Therefore, no new admin can be created.");
		return;
	}

	const [mail, password] = option.split(":");
	await addAdmin(mail, password, boroughOrganizationIdentifiers);
}

async function handleTagInsertion() {
	if (await areTagsAvailable()) {
		console.log("There are already tags in the database. Therefore, no new tags can be created.");
		return;
	}

	await addTags();
	await addAccessibilityTags();
}

main();
