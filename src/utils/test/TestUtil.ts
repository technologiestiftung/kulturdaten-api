import express from "express";
import { capture } from "ts-mockito";

export function expectResponseSendIsEqual(mockesResponse: express.Response, expected: object) {
	const [firstArg] = capture(mockesResponse.send).last();
	expect(firstArg).toEqual(expected);
}

/**
 * Returns the seconds since 1970-01-01T00:00:00Z for a given date string,
 * e.g. to compare dates with a less precise granularity.
 */
export function getSeconds(dateString: string) {
	const seconds = new Date(dateString).getTime() / 1000;
	return Math.round(seconds);
}
