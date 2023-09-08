import request from "supertest";
import { fakeCreateEventRequest } from "../generated/faker/faker.CreateEventRequest.generated";
import { Event, validateEvent } from "../generated/models/Event.generated";
import { FindEventsByAttractionTagFilterStrategy } from "../resources/events/filter/implementations/FindEventsByAttractionTagFilterStrategy";
import { FindEventsByLocationAccessibilityTagsFilterStrategy } from "../resources/events/filter/implementations/FindEventsByLocationAccessibilityTagsFilterStrategy";
import { FindEventsByMongoDBFilterStrategy } from "../resources/events/filter/implementations/FindEventsByMongoDBFilterStrategy";
import { FindInTheFutureEventsFilterStrategy } from "../resources/events/filter/implementations/FindInTheFutureEventsFilterStrategy";
import { getStartDateAsISO } from "../utils/DateTimeUtil";
import { TestEnvironment } from "./integrationtestutils/TestEnvironment";
import { EVENT_IDENTIFIER_REG_EX } from "./integrationtestutils/testmatcher";
import threeDummyAttractions from "./testdata/attractions.json";
import dummyEvents from "./testdata/events.json";
import dummyLocations from "./testdata/locations.json";

let env!: TestEnvironment;

beforeAll(async () => {
	env = new TestEnvironment();
	(await env.startServer()).withEventsRoutes().withAttractionsRoutes().withLocationsRoutes();
});

afterAll(async () => {
	await env.stopServer();
});

describe("Validate testData", () => {
	beforeEach(async () => {
		await env.events.insertMany(dummyEvents);
	});

	afterEach(async () => {
		await env.events.deleteMany();
	});

	it("should validate the test data", async () => {
		const eventDocuments = await env.events.find().toArray();
		for (const o of eventDocuments) {
			expect(validateEvent(o).isValid).toBe(true);
		}
	});
});

describe("Create events", () => {
	afterEach(async () => {
		await env.events.deleteMany();
	});

	it("should create an event and return an identifier / POST /events", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE)
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send(fakeCreateEventRequest(false, { title: { de: "New Event" } }));

		expect(statusCode).toBe(201);

		const newEventID = body.data.eventReference.referenceId;
		expect(newEventID).toMatch(EVENT_IDENTIFIER_REG_EX);
		const loc = await env.events.findOne({ identifier: newEventID });

		expect(loc?.title.de).toBe("New Event");
	});
});

describe("Read events", () => {
	beforeEach(async () => {
		await env.events.insertMany(dummyEvents);
	});

	afterEach(async () => {
		await env.events.deleteMany();
	});

	it("should return a list of all events / GET /events", async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(4);
		for (const o of body.data.events) {
			expect(validateEvent(o).isValid).toBe(true);
		}
	});

	it("should sort by events their start date and time / GET /events", async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE);
		const events: Event[] = body.data.events;

		expect(statusCode).toBe(200);
		events.forEach((event, index) => {
			if (index === 0) {
				return;
			}
			const previousEvent = events[index - 1];
			const isoString = getStartDateAsISO(event);
			const previousIsoString = getStartDateAsISO(previousEvent);
			const isStartLaterOrEqual = previousIsoString <= isoString;
			expect(isStartLaterOrEqual).toBe(true);
		});
	});

	it("should return a empty list / GET /events", async () => {
		await env.events.deleteMany();

		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE);

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(0);
	});

	it("should return an error when an invalid ID is provided / GET /events/invalidID", async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE + "/invalidID");

		expect(statusCode).toBe(404);
		expect(body.error.message).toBe("Resource Not Found");
	});

	it("should return a single event / GET /events/existID", async () => {
		const { body, statusCode } = await request(env.app).get(env.EVENTS_ROUTE + "/1234-5678-9101-1121");

		expect(statusCode).toBe(200);
		expect(validateEvent(body.data.event).isValid).toBe(true);
		expect(body.data.event.identifier).toBe("1234-5678-9101-1121");
		expect(body.data.event.title.de).toBe("Konzert in Berlin");
	});
});

describe("Update events", () => {
	beforeEach(async () => {
		await env.events.insertMany(dummyEvents);
	});

	afterEach(async () => {
		await env.events.deleteMany();
	});

	it("should update the name of a event / PATCH /events/existID", async () => {
		const { statusCode } = await request(env.app)
			.patch(env.EVENTS_ROUTE + "/1234-5678-9101-1121")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(200);
		const loc = await env.events.findOne({ identifier: "1234-5678-9101-1121" });
		expect(loc?.title.de).toBe("Neuer Name");
	});

	it("should return an error when an invalid ID is provided / PATCH /events/invalidID", async () => {
		const { body, statusCode } = await request(env.app)
			.patch(env.EVENTS_ROUTE + "/invalidID")
			.set("Authorization", `Bearer ` + env.USER_TOKEN)
			.send({
				title: { de: "Neuer Name" },
			});

		expect(statusCode).toBe(400);
		expect(body.error.message).toBe("Bad Request");
	});
});

describe("Search events", () => {
	beforeEach(async () => {
		await env.events.insertMany(dummyEvents);
		await env.attractions.insertMany(threeDummyAttractions);
		await env.locations.insertMany(dummyLocations);
		const findInTheFutureStrategy = new FindInTheFutureEventsFilterStrategy(env.eventsRepository);
		findInTheFutureStrategy.today = () => "2023-08-11";
		env.eventsService.filterStrategies = [
			new FindEventsByMongoDBFilterStrategy(env.eventsRepository),
			new FindEventsByAttractionTagFilterStrategy(env.eventsRepository, env.attractionsRepository),
			new FindEventsByLocationAccessibilityTagsFilterStrategy(env.eventsRepository, env.locationsRepository),
			findInTheFutureStrategy,
		];
	});

	afterEach(async () => {
		await env.events.deleteMany();
		await env.attractions.deleteMany();
		await env.locations.deleteMany();
	});

	it("should return 2 events with tag Berlin  / POST /events/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE + "/search")
			.send({
				searchFilter: { tags: { $in: ["Berlin"] } },
			});

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(2);
		expect(body.data.events[0].tags).toContain("Berlin");
		expect(body.data.events[1].tags).toContain("Berlin");
	});

	it("should return 2 events whose attractions have the tag education  / POST /events/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE + "/search")
			.send({
				byAttractionTags: {
					tags: ["education"],
					matchMode: "any",
				},
			});

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(2);
		const identifier0 = body.data.events[0].identifier;
		expect(identifier0.includes("1234-5678-9101-1121") || identifier0.includes("7890-1234-5678-9012")).toBeTruthy();
		const identifier1 = body.data.events[1].identifier;
		expect(identifier1.includes("1234-5678-9101-1121") || identifier1.includes("7890-1234-5678-9012")).toBeTruthy();
	});

	it("should return 1 event whose attractions have the tag history AND the tag  berlin-wall / POST /events/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE + "/search")
			.send({
				byAttractionTags: {
					tags: ["history", "berlin-wall"],
					matchMode: "all",
				},
			});

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(1);
		expect(body.data.events[0].attractions[0].referenceId).toContain("berlin-wall-vr-experience-12345");
	});

	it("should return 1 event whose location is accessible with a wheelchair / POST /events/search", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE + "/search")
			.send({
				byLocationAccessibilityTags: {
					tags: ["location.accessibility.WheelchairAccessible"],
					matchMode: "all",
				},
			});

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(1);
		expect(body.data.events[0].identifier).toContain("1337-1234-5678-9012");
	});

	it("should return today's event (2023-08-11) and tomorrow's event / POST /events/search/", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE + "/search")
			.send({
				inTheFuture: true,
			});

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(2);
		expect(body.data.events[0].identifier).toBe("4321-8765-0123-4567");
		expect(body.data.events[1].identifier).toBe("7890-1234-5678-9012");
	});

	it("should return all events / POST /events/search/", async () => {
		const { body, statusCode } = await request(env.app)
			.post(env.EVENTS_ROUTE + "/search")
			.send({
				inTheFuture: false,
			});

		expect(statusCode).toBe(200);
		expect(body.data.events).toHaveLength(4);
	});
});
