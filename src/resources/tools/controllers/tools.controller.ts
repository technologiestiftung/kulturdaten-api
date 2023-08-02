import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { GenerateEventsRequest } from '../../../generated/models/GenerateEventsRequest.generated';

const log: debug.IDebugger = debug('app:tools-controller');

@Service()
export class ToolsController {
	generateEventsAndAttraction(res: express.Response<any, Record<string, any>>, generateEventsRequest: GenerateEventsRequest) {
		throw new Error('Method not implemented.');
	}

}
