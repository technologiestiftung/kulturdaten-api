import express from 'express';
import { pagination } from '../config/kulturdaten.config';
import debug from 'debug';
import { Pagination } from '../common/parameters/Pagination';

const log: debug.IDebugger = debug('app:request-utils');

export function getPagination(req: express.Request) : Pagination {
	let page: number = extractFromQuery(req.query.page, pagination.defaultPage);
	let pageSize: number = extractFromQuery(req.query.pageSize, pagination.defaultPageSize);

	page = adjust(page, 1);
	pageSize = adjust(pageSize, 1, pagination.maxPageSize);

	return new Pagination(page, pageSize);
}

function extractFromQuery(value: any, defaultValue: number): number {
    return value ? parseInt(value as string, 10) : defaultValue;
}


function adjust(value: number, defaultMinValue: number, defaultMaxValue?: number) : number {
	if (value < defaultMinValue) {
		value = defaultMinValue;
	}
	if (defaultMaxValue && value > defaultMaxValue) {
		value = defaultMaxValue;
	}
	return value;
}