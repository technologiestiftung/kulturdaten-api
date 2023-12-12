import { Attraction } from "../../generated/models/Attraction.generated";
import { SimpleFilterFactory } from "./FilterFactory";

describe("SimpleFilterFactory", () => {
	let factory: SimpleFilterFactory<Attraction>;

	beforeEach(() => {
		factory = new SimpleFilterFactory<Attraction>();
	});

	it("should create an exact match filter", () => {
		const filter = factory.createExactMatchFilter("identifier", "123");
		expect(filter).toEqual({ identifier: "123" });
	});

	it("should create a partial match filter", () => {
		const filter = factory.createPartialMatchFilter("identifier", "123");
		expect(filter).toEqual({ identifier: { $regex: "123", $options: "i" } });
	});

	it("should create an any match filter", () => {
		const filter = factory.createAnyMatchFilter("tags", ["tag1", "tag2"]);
		expect(filter).toEqual({ tags: { $in: ["tag1", "tag2"] } });
	});

	it("should create an all match filter", () => {
		const filter = factory.createAllMatchFilter("tags", ["tag1", "tag2"]);
		expect(filter).toEqual({ tags: { $all: ["tag1", "tag2"] } });
	});

	it("should combine filters with AND", () => {
		const filter1 = { identifier: "123" };
		const filter2 = { type: "type.Attraction" };
		const combinedFilter = factory.combineWithAnd([filter1, filter2]);
		expect(combinedFilter).toEqual({ $and: [filter1, filter2] });
	});

	it("should combine filters with OR", () => {
		const filter1 = { identifier: "123" };
		const filter2 = { type: "type.Attraction" };
		const combinedFilter = factory.combineWithOr([filter1, filter2]);
		expect(combinedFilter).toEqual({ $or: [filter1, filter2] });
	});
});
