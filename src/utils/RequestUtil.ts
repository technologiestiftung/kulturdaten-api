import express from 'express';
import { pagination } from '../config/kulturdaten.config';
import debug from 'debug';

const log: debug.IDebugger = debug('app:request-utils');

export function getPagination(req: express.Request) {
	let page: number = req.query.page ? parseInt(req.query.page as string, 10) : pagination.defaultPage;
	let pageSize: number = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : pagination.defaultPageSize;

	if (isNaN(page) || page < 1) {
		page = pagination.defaultPage;
	}
	if (isNaN(pageSize) || pageSize < 1) {
		pageSize = pagination.defaultPageSize;
	}
	if (pageSize > pagination.maxPageSize) {
		pageSize = pagination.maxPageSize;
	}
	
	return {
		page: page, 
		pageSize: pageSize
	}
}