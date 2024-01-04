import debug from "debug";
import express from "express";
import { pagination } from "../config/Config";
import { Pagination } from "../generated/models/Pagination.generated";

const log: debug.IDebugger = debug("app:request-utils");

export function getPagination(req: express.Request, complexRequest?: boolean): Pagination {
	let page: number = extractFromQuery(req.query.page, pagination.defaultPage);
	let pageSize: number = extractFromQuery(req.query.pageSize, pagination.defaultPageSize);

	page = adjust(page, 1);
	pageSize = adjust(pageSize, 1, complexRequest ? pagination.maxComplexRequestPageSize : pagination.maxPageSize);

	return { page: page, pageSize: pageSize };
}

function extractFromQuery(value: any, defaultValue: number): number {
	return value ? parseInt(value as string, 10) : defaultValue;
}

function adjust(value: number, defaultMinValue: number, defaultMaxValue?: number): number {
	if (value < defaultMinValue) {
		value = defaultMinValue;
	}
	if (defaultMaxValue && value > defaultMaxValue) {
		value = defaultMaxValue;
	}
	return value;
}

export const extractArrayQueryParam = (req: express.Request, paramName: string): string[] | undefined => {
	const paramValue = req.query[paramName];
	if (Array.isArray(paramValue)) {
		return paramValue as string[];
	} else if (paramValue) {
		return [paramValue as string];
	} else {
		return undefined;
	}
};

export const parseBooleanParameter = (req: express.Request, paramName: string): boolean | undefined => {
	const paramValue = req.query[paramName];
	if (paramValue === undefined) {
		return undefined;
	} else {
		return (paramValue + "").toLowerCase() === "true";
	}
};
