import { getSeconds } from "./TestUtil";
import { describe, test, expect } from "vitest";


describe("TestUtil", () => {
	describe(getSeconds.name, () => {
		test("returns the correct seconds for a date", () => {
			const actual = getSeconds("2023-10-02T11:10:44.142Z");
			const expected = 1696245044;
			expect(actual).toBe(expected);
		});
	});
});
