import request from "supertest";
import { MONGO_DB_DEFAULT_PROJECTION } from "../config/Config";
import { fakeCreateOrganizationRequest } from "../generated/faker/faker.CreateOrganizationRequest.generated";
import { Organization, validateOrganization } from "../generated/models/Organization.generated";
import { getSeconds } from "../utils/test/TestUtil";
import { TestEnvironment } from "./integrationtestutils/TestEnvironment";
import { ORGANIZATION_IDENTIFIER_REG_EX } from "./integrationtestutils/testmatcher";
import threeDummyOrganizations from "./testdata/organizations.json";
import userDummies from "./testdata/users.json";
import { describe, beforeAll, afterAll, beforeEach, afterEach, it, vi, expect } from "vitest";

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withOrganizationsRoutes();
	vi.useFakeTimers();
});

afterAll(async () => {
	await env.stopServer();
	vi.useRealTimers();
});

describe("Validate testData", () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it("should validate the test data", async () => {
		const organizationDocuments = await env.organizations
			.find({}, { projection: MONGO_DB_DEFAULT_PROJECTION })
			.toArray();
		for (const o of organizationDocuments) {
			const isValid = validateOrganization(o).isValid;
			expect(isValid).toBe(true);
		}
	});
});

describe("Create organizations", () => {
	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it("should create an organization and return an identifier / POST /organizations", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.ORGANIZATIONS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateOrganizationRequest(false, { title: { de: "New Organization" } }));

		expect(statusCode).toBe(201);

		const newOrganizationID = body.data.organizationReference.referenceId;
		expect(newOrganizationID).toMatch(ORGANIZATION_IDENTIFIER_REG_EX);
		const createdOrganization = await env.organizations.findOne<Organization>({ identifier: newOrganizationID });
		expect(createdOrganization!.title!.de).toBe("New Organization");
	});

	it("should create default metadata with a started and updated timestamp / POST /organizations", async () => {
		vi.setSystemTime(new Date("2023-10-01T01:02:03.000Z"));
		const { body } = await request(env.app)
			.post(env.ORGANIZATIONS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateOrganizationRequest(false, { title: { de: "New Organization" } }));
		const newOrganizationID = body.data.organizationReference.referenceId;
		const createdOrganization = await env.organizations.findOne<Organization>({ identifier: newOrganizationID });
		const metadata = createdOrganization!.metadata!;
		expect(getSeconds(metadata.created)).toBe(getSeconds("2023-10-01T01:02:03.000Z"));
		expect(getSeconds(metadata.updated)).toBe(getSeconds("2023-10-01T01:02:03.000Z"));
	});
});

describe("Read organizations", () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it("should return a list of all organizations / GET /organizations", async () => {
		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.organizations).toHaveLength(3);
		for (const o of body.data.organizations) {
			expect(validateOrganization(o).isValid).toBe(true);
		}
	});

	it("should return a empty list / GET /organizations", async () => {
		await env.organizations.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.organizations).toHaveLength(0);
	});

	it("should return an error when an invalid ID is provided / GET /organizations/invalidID", async () => {
		const { body, statusCode } = await request(env.app).get(env.ORGANIZATIONS_ROUTE + "/invalidID");

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe("Resource Not Found");
	});

	it("should return a single organization / GET /organizations/existID", async () => {
		const { body, statusCode } = await request(env.app).get(
			env.ORGANIZATIONS_ROUTE + "/O_temporal-cultural-exchange-45123",
		);

		expect(statusCode).toBe(200);
		expect(validateOrganization(body.data.organization).isValid).toBe(true);
		expect(body.data.organization.identifier).toBe("O_temporal-cultural-exchange-45123");
		expect(body.data.organization.title.de).toBe("Zeitreisende Kulturelle Austauschorganisation");
	});
});

describe("Update organizations", () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it("should update the name of a organization / PATCH /organizations/existID", async () => {
		const identifier = "O_temporal-cultural-exchange-45123";
		const { statusCode } = await request(env.app)
			.patch(env.ORGANIZATIONS_ROUTE + "/" + identifier)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(200);
		const updatedOrganization = await env.organizations.findOne<Organization>({ identifier });
		expect(updatedOrganization!.title!.de).toBe("Neuer Name");
	});

	it("should keep the created timestamp and update the updated timestamp of a event / PATCH /organizations/existID", async () => {
		const identifier = "O_temporal-cultural-exchange-45123";
		const existingOrganization = await env.organizations.findOne<Organization>({ identifier });
		vi.setSystemTime(new Date("2023-10-23T01:02:03.000Z"));
		await request(env.app)
			.patch(env.ORGANIZATIONS_ROUTE + "/" + identifier)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});
		const updatedOrganization = await env.organizations.findOne<Organization>({ identifier });
		const metadata = updatedOrganization!.metadata!;
		expect(metadata.created).toBe(existingOrganization!.metadata!.created);
		expect(getSeconds(metadata.updated)).toBe(getSeconds("2023-10-23T01:02:03.000Z"));
	});

	it("should return an error when an invalid ID is provided / PATCH /organizations/invalidID", async () => {
		const { body, statusCode } = await request(env.app)
			.patch(env.ORGANIZATIONS_ROUTE + "/invalidID")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(400);
		expect(body.error.message).toBe("Bad Request");
	});
});

describe("Search organizations", () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
	});

	it("should return 2 organizations with tag workshops  / POST /organizations/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.ORGANIZATIONS_ROUTE + "/search")
			.send({
				searchFilter: { tags: { $in: ["workshops"] } },
			});

		expect(statusCode).toBe(200);
		expect(body.data.organizations).toHaveLength(2);
		expect(body.data.organizations[0].tags).toContain("workshops");
		expect(body.data.organizations[1].tags).toContain("workshops");
	});
});

describe("Organize Membership", () => {
	beforeEach(async () => {
		await env.organizations.insertMany(threeDummyOrganizations);
		await env.users.insertMany(userDummies);
	});

	afterEach(async () => {
		await env.organizations.deleteMany();
		await env.users.deleteMany();
	});

	it("should return membership for invited user  / POST /organizations/{identifier}/memberships", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.ORGANIZATIONS_ROUTE + "/O_berlin-art-emporium-12345/memberships")
			.send({
				email: "user@ts.berlin",
				role: "admin",
			});

		expect(statusCode).toBe(201);
		expect(body).toStrictEqual({
			success: true,
			message: "Operation Successful",
			data: {
				membership: {
					email: "user@ts.berlin",
					userIdentifier: "B4R7GJH2KH6H",
					firstName: "Ulf",
					lastName: "User",
					role: "admin",
				},
			},
		});
	});

	it("should return 204  / DELETE /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const { statusCode } = await request(env.app)
			.delete(env.ORGANIZATIONS_ROUTE + "/O_L8346W3HSL9A/memberships/B4R7GJH2KH6H")
			.send();
		expect(statusCode).toBe(204);
	});

	it("should return memberships for all members  / GET /organizations/{identifier}/memberships", async () => {
		const oneOrganizationRoute = env.ORGANIZATIONS_ROUTE + "/O_berlin-art-emporium-12345/memberships";
		const anotherOrganization = env.ORGANIZATIONS_ROUTE + "/O_berlin-literary-cafe-67890/memberships";
		await request(env.app).post(oneOrganizationRoute).send({
			email: "user@ts.berlin",
			role: "admin",
		});
		await request(env.app).post(anotherOrganization).send({
			email: "admin@ts.berlin",
			role: "admin",
		});

		const { body, statusCode } = await request(env.app)
			.get(env.ORGANIZATIONS_ROUTE + "/O_berlin-art-emporium-12345/memberships")
			.send();

		expect(statusCode).toBe(200);
		expect(body).toStrictEqual({
			data: {
				memberships: [
					{
						email: "user@ts.berlin",
						firstName: "Ulf",
						lastName: "User",
						role: "admin",
						userIdentifier: "B4R7GJH2KH6H",
					},
				],
				organizationIdentifier: "O_berlin-art-emporium-12345",
			},
			message: "Operation Successful",
			success: true,
		});
	});

	it("should return all memberships for a given organization identifier / GET /organizations/{identifier}/memberships", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";

		const { statusCode: getAllStatusCode } = await request(env.app).get(
			`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships`,
		);

		expect(getAllStatusCode).toBe(200);
	});

	it("should return a single membership for a given user identifier within an organization / GET /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";
		const userIdentifier = "B4R7GJH2KH6H";

		const { statusCode: getSingleStatusCode } = await request(env.app).get(
			`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships/${userIdentifier}`,
		);

		expect(getSingleStatusCode).toBe(200);
	});

	it("should handle the case when a membership for a given user identifier within an organization is not found / GET /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";
		const invalidUserIdentifier = "U_INVALID";

		const { statusCode: getSingleNotFoundStatusCode } = await request(env.app).get(
			`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships/${invalidUserIdentifier}`,
		);

		expect(getSingleNotFoundStatusCode).toBe(404);
	});

	it("should create a new membership for a user within an organization / POST /organizations/{identifier}/memberships", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";

		const { statusCode: postCreateStatusCode } = await request(env.app)
			.post(`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships`)
			.send({
				email: "admin@ts.berlin",
				role: "member",
			});

		expect(postCreateStatusCode).toBe(201);
	});

	it("should return an error when trying to create a membership for a user that already exists within an organization / POST /organizations/{identifier}/memberships", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";

		const { statusCode: postCreateExistingUserStatusCode } = await request(env.app)
			.post(`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships`)
			.send({
				email: "existinguser@ts.berlin",
				role: "member",
			});
		expect(postCreateExistingUserStatusCode).toBe(404);
	});

	it("should return an error when trying to create a membership for a user that does not exist / POST /organizations/{identifier}/memberships", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";

		const { statusCode: postCreateNonExistentUserStatusCode } = await request(env.app)
			.post(`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships`)
			.send({
				email: "nonexistentuser@ts.berlin",
				role: "member",
			});
		expect(postCreateNonExistentUserStatusCode).toBe(404);
	});

	it("should update the role of an existing membership within an organization / PATCH /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";
		const userIdentifier = "B4R7GJH2KH6H";

		const { statusCode: patchUpdateStatusCode } = await request(env.app)
			.patch(`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships/${userIdentifier}`)
			.send({
				role: "editor",
			});
		expect(patchUpdateStatusCode).toBe(204);
	});

	it("should handle the case when attempting to update a membership that does not exist within an organization / PATCH /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";
		const invalidUserIdentifier = "U_invalid123";

		const { statusCode: patchUpdateNotFoundStatusCode } = await request(env.app)
			.patch(`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships/${invalidUserIdentifier}`)
			.send({
				role: "editor",
			});
		expect(patchUpdateNotFoundStatusCode).toBe(400);
	});

	it("should delete a membership for a given user identifier within an organization / DELETE /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";
		const userIdentifier = "B4R7GJH2KH6H";

		const { statusCode: deleteStatusCode } = await request(env.app).delete(
			`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships/${userIdentifier}`,
		);
		expect(deleteStatusCode).toBe(204);
	});

	it("should handle the case when attempting to delete a membership that does not exist within an organization / DELETE /organizations/{identifier}/memberships/{userIdentifier}", async () => {
		const organizationIdentifier = "O_berlin-literary-cafe-67890";
		const invalidUserIdentifier = "U_invalid123";

		const { statusCode: deleteNotFoundStatusCode } = await request(env.app).delete(
			`${env.ORGANIZATIONS_ROUTE}/${organizationIdentifier}/memberships/${invalidUserIdentifier}`,
		);
		expect(deleteNotFoundStatusCode).toBe(400);
	});
});
