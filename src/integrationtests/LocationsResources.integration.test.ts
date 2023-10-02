import request from "supertest";
import { fakeCreateLocationRequest } from "../generated/faker/faker.CreateLocationRequest.generated";
import { Location, validateLocation } from "../generated/models/Location.generated";
import { getSeconds } from "../utils/test/TestUtil";
import { TestEnvironment } from "./integrationtestutils/TestEnvironment";
import { LOCATION_IDENTIFIER_REG_EX } from "./integrationtestutils/testmatcher";
import dummyLocations from "./testdata/locations.json";

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withLocationsRoutes();
	jest.useFakeTimers({ advanceTimers: true });
});

afterAll(async () => {
	await env.stopServer();
	jest.useRealTimers();
});

describe("Validate testData", () => {
	beforeEach(async () => {
		await env.locations.insertMany(dummyLocations);
	});

	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it("should validate the test data", async () => {
		const locationDocuments = await env.locations.find().toArray();
		for (const o of locationDocuments) {
			expect(validateLocation(o).isValid).toBe(true);
		}
	});
});

describe("Create locations", () => {
	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it("should create a location and return an identifier / POST /locations", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.LOCATIONS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateLocationRequest(false, { title: { de: "New Location" } }));

		expect(statusCode).toBe(201);

		const newLocationID = body.data.locationReference.referenceId;
		expect(newLocationID).toMatch(LOCATION_IDENTIFIER_REG_EX);
		const createdLocation = await env.locations.findOne<Location>({ identifier: newLocationID });
		expect(createdLocation!.title!.de).toBe("New Location");
	});

	it("should create default metadata with a started and updated timestamp / POST /locations", async () => {
		jest.setSystemTime(new Date("2023-10-01T01:02:03.000Z"));
		const { body } = await request(env.app)
			.post(env.LOCATIONS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateLocationRequest(false, { title: { de: "New Location" } }));
		const newLocationID = body.data.locationReference.referenceId;
		const createdLocation = await env.locations.findOne<Location>({ identifier: newLocationID });
		const metadata = createdLocation!.metadata!;
		expect(getSeconds(metadata.created)).toBe(getSeconds("2023-10-01T01:02:03.000Z"));
		expect(getSeconds(metadata.updated)).toBe(getSeconds("2023-10-01T01:02:03.000Z"));
	});
});

describe("Read locations", () => {
	beforeEach(async () => {
		await env.locations.insertMany(dummyLocations);
	});

	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it("should return a list of all locations / GET /locations", async () => {
		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.locations).toHaveLength(4);
		for (const o of body.data.locations) {
			expect(validateLocation(o).isValid).toBe(true);
		}
	});

	it("should return a empty list / GET /locations", async () => {
		await env.locations.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.locations).toHaveLength(0);
	});

	it("should return an error when an invalid ID is provided / GET /locations/invalidID", async () => {
		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE + "/invalidID");

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe("Resource Not Found");
	});

	it("should return a single location / GET /locations/existID", async () => {
		const { body, statusCode } = await request(env.app).get(env.LOCATIONS_ROUTE + "/LOC-12345678");

		expect(statusCode).toBe(200);
		expect(validateLocation(body.data.location).isValid).toBe(true);
		expect(body.data.location.identifier).toBe("LOC-12345678");
		expect(body.data.location.title.de).toBe("Berliner Historisches Museum");
	});
});

describe("Update locations", () => {
	beforeEach(async () => {
		await env.locations.insertMany(dummyLocations);
	});

	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it("should update the name of a location / PATCH /locations/existID", async () => {
		const { statusCode } = await request(env.app)
			.patch(env.LOCATIONS_ROUTE + "/LOC-12345678")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(200);
		const updatedLocation = await env.locations.findOne<Location>({ identifier: "LOC-12345678" });
		expect(updatedLocation!.title!.de).toBe("Neuer Name");
	});

	it("should keep the created timestamp and update the updated timestamp of a event / PATCH /locations/existID", async () => {
		const identifier = "LOC-12345678";
		const existingLocation = await env.locations.findOne<Location>({ identifier });
		jest.setSystemTime(new Date("2023-10-23T01:02:03.000Z"));
		await request(env.app)
			.patch(env.LOCATIONS_ROUTE + "/" + identifier)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});
		const updatedLocation = await env.locations.findOne<Location>({ identifier });
		const metadata = updatedLocation!.metadata!;
		expect(metadata.created).toBe(existingLocation!.metadata!.created);
		expect(getSeconds(metadata.updated)).toBe(getSeconds("2023-10-23T01:02:03.000Z"));
	});

	it("should return an error when an invalid ID is provided / PATCH /locations/invalidID", async () => {
		const { body, statusCode } = await request(env.app)
			.patch(env.LOCATIONS_ROUTE + "/invalidID")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(400);
		expect(body.error.message).toBe("Bad Request");
	});
});

describe("Search locations", () => {
	beforeEach(async () => {
		await env.locations.insertMany(dummyLocations);
	});

	afterEach(async () => {
		await env.locations.deleteMany();
	});

	it("should return 2 locations with tag attraction.category.Stages  / POST /locations/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.LOCATIONS_ROUTE + "/search")
			.send({
				searchFilter: { tags: { $in: ["attraction.category.Stages"] } },
			});

		expect(statusCode).toBe(200);
		expect(body.data.locations).toHaveLength(2);
		expect(body.data.locations[0].tags).toContain("attraction.category.Stages");
		expect(body.data.locations[1].tags).toContain("attraction.category.Stages");
	});
});
