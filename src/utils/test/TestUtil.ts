import express from "express";
import { capture } from "ts-mockito";

export function expectResponseSendIsEqual(mockesResponse: express.Response, expected: object) {
	const [firstArg] = capture(mockesResponse.send).last();
	expect(firstArg).toEqual(expected);
}
