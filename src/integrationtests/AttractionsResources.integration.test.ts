import request from "supertest";
import { MONGO_DB_DEFAULT_PROJECTION } from "../config/Config";
import { fakeCreateAttractionRequest } from "../generated/faker/faker.CreateAttractionRequest.generated";
import { Attraction, validateAttraction } from "../generated/models/Attraction.generated";
import { getSeconds } from "../utils/test/TestUtil";
import { TestEnvironment } from "./integrationtestutils/TestEnvironment";
import { ATTRACTION_IDENTIFIER_REG_EX } from "./integrationtestutils/testmatcher";
import threeDummyAttractions from "./testdata/attractions.json";

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withAttractionsRoutes();
	jest.useFakeTimers({ advanceTimers: true });
});

afterAll(async () => {
	await env.stopServer();
	jest.useRealTimers();
});

describe("Validate testData", () => {
	beforeEach(async () => {
		await env.attractions.insertMany(threeDummyAttractions);
	});

	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it("should validate the test data", async () => {
		const attractionDocuments = await env.attractions.find({}, { projection: MONGO_DB_DEFAULT_PROJECTION }).toArray();
		for (const o of attractionDocuments) {
			const isValid = validateAttraction(o).isValid;
			expect(isValid).toBe(true);
		}
	});
});

describe("Create attractions", () => {
	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it("should create a attraction and return a identifier / POST /attractions", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.ATTRACTIONS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateAttractionRequest(false, { title: { de: "New Attraction" } }));

		expect(statusCode).toBe(201);

		const newAttractionID = body.data.attractionReference.referenceId;
		expect(newAttractionID).toMatch(ATTRACTION_IDENTIFIER_REG_EX);
		const createdAttraction = await env.attractions.findOne<Attraction>({ identifier: newAttractionID });

		expect(createdAttraction?.title.de).toBe("New Attraction");
	});

	it("should create default metadata with a started and updated timestamp", async () => {
		jest.setSystemTime(new Date("2023-10-01T01:02:03.000Z"));
		const { body } = await request(env.app)
			.post(env.ATTRACTIONS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateAttractionRequest(false, { title: { de: "New Attraction" } }));
		const newAttractionID = body.data.attractionReference.referenceId;
		const createdAttraction = await env.attractions.findOne<Attraction>({ identifier: newAttractionID });
		const metadata = createdAttraction!.metadata!;
		expect(getSeconds(metadata.created)).toBe(getSeconds("2023-10-01T01:02:03.000Z"));
		expect(getSeconds(metadata.updated)).toBe(getSeconds("2023-10-01T01:02:03.000Z"));
	});
});

describe("Read attractions", () => {
	beforeEach(async () => {
		await env.attractions.insertMany(threeDummyAttractions);
	});

	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it("should return a list of all attractions / GET /attractions", async () => {
		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.attractions).toHaveLength(4);
		for (const o of body.data.attractions) {
			expect(validateAttraction(o).isValid).toBe(true);
		}
	});

	it("should return a empty list / GET /attractions", async () => {
		await env.attractions.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.attractions).toHaveLength(0);
	});

	it("should return an error when an invalid ID is provided / GET /attractions/invalidID", async () => {
		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE + "/invalidID");

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe("Resource Not Found");
	});

	it("should return a single attraction / GET /attractions/existID", async () => {
		const { body, statusCode } = await request(env.app).get(env.ATTRACTIONS_ROUTE + "/skywalkers-observatory-12345");

		expect(statusCode).toBe(200);
		expect(validateAttraction(body.data.attraction).isValid).toBe(true);
		expect(body.data.attraction.identifier).toBe("skywalkers-observatory-12345");
		expect(body.data.attraction.title.de).toBe("Skywalkers Observatorium");
	});
});

describe("Update attractions", () => {
	beforeEach(async () => {
		await env.attractions.insertMany(threeDummyAttractions);
	});

	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it("should update the name of a attraction / PATCH /attractions/existID", async () => {
		const { statusCode } = await request(env.app)
			.patch(env.ATTRACTIONS_ROUTE + "/skywalkers-observatory-12345")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(200);
		const updatedAttraction = await env.attractions.findOne<Attraction>({ identifier: "skywalkers-observatory-12345" });
		expect(updatedAttraction?.title.de).toBe("Neuer Name");
	});

	it("should keep the created timestamp and update the updated timestamp of an attraction / PATCH /attractions/existID", async () => {
		const identifier = "skywalkers-observatory-12345";
		const existingAttraction = await env.attractions.findOne<Attraction>({ identifier });
		jest.setSystemTime(new Date("2023-10-23T01:02:03.000Z"));
		await request(env.app)
			.patch(env.ATTRACTIONS_ROUTE + "/" + identifier)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});
		const updatedAttraction = await env.attractions.findOne<Attraction>({ identifier });
		const metadata = updatedAttraction!.metadata;
		expect(metadata.created).toBe(existingAttraction!.metadata!.created);
		expect(getSeconds(metadata.updated)).toBe(getSeconds("2023-10-23T01:02:03.000Z"));
	});

	it("should return an error when an invalid ID is provided / PATCH /attractions/invalidID", async () => {
		const { body, statusCode } = await request(env.app)
			.patch(env.ATTRACTIONS_ROUTE + "/invalidID")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(400);
		expect(body.error.message).toBe("Bad Request");
	});
});

describe("Search attractions", () => {
	beforeEach(async () => {
		await env.attractions.insertMany(threeDummyAttractions);
	});

	afterEach(async () => {
		await env.attractions.deleteMany();
	});

	it("should return 2 attractions with tag history  / POST /attractions/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.ATTRACTIONS_ROUTE + "/search")
			.send({
				searchFilter: { tags: { $in: ["history"] } },
			});

		expect(statusCode).toBe(200);
		expect(body.data.attractions).toHaveLength(2);
		expect(body.data.attractions[0].tags).toContain("history");
		expect(body.data.attractions[1].tags).toContain("history");
	});
});
