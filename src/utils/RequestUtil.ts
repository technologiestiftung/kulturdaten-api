import express from 'express';
import { pagination } from '../config/kulturdaten.config';
import debug from 'debug';

const log: debug.IDebugger = debug('app:request-utils');

export function getPagination(req: express.Request) {
	let page: number = extractFromQuery(req.query.page, pagination.defaultPage);
	let pageSize: number = extractFromQuery(req.query.pageSize, pagination.defaultPageSize);

	page = validate(page, pagination.defaultPage);
	pageSize = validate(pageSize, pagination.defaultPageSize, pagination.maxPageSize);

	return {
		page: page,
		pageSize: pageSize
	}
}

function extractFromQuery(value: any, defaultValue: number): number {
    return value ? parseInt(value as string, 10) : defaultValue;
}


function validate(value: number, defaultMinValue: number, defaultMaxValue?: number) : number {
	if (value < defaultMinValue) {
		value = defaultMinValue;
	}
	if (defaultMaxValue && value > defaultMaxValue) {
		value = defaultMaxValue;
	}
	return value;
}