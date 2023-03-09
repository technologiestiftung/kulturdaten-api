
import express from 'express';
import { expect, jest, test } from '@jest/globals';
import { KdbAPI } from '../../KdbAPI';
import request from 'supertest';
import { MockOrganizersRepository, dummyOrganizer } from '../mocks/MockOrganizersRepository';
import { OrganizersRoutes } from '../../organizers/organizers.routes.config';
import { Organizer } from "../../organizers/repositories/organizer";
import { OrganizersController } from '../../organizers/controllers/organizers.controller';
import { OrganizersMiddleware } from '../../organizers/middleware/organizers.middleware';
import { OrganizersService } from '../../organizers/services/organizers.service';
import { DateUtil } from '../../utils/DateUtil';
import { OrganizersRepository } from '../../organizers/repositories/organizers.repository';


beforeEach(() => {
	jest.clearAllMocks();

});


describe('get organizers is being tested', () => {
	test('empty repo returns status 200 and empty organizers', async () => {
		const { organizersRoutes } = createOrganizersRoutes([]);
		const kdbAPI = new KdbAPI(express(), '3000');
		kdbAPI.registerRoutes(organizersRoutes);
		const app = kdbAPI.app;

		const response = await request(app)
			.get('/v1/organizers')
			.set('Accept', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.body).toEqual({ "organizers": [] });
	});

	test('filles repo returns status 200 and all organizers', async () => {
		let dummyOrganizers: Organizer[] = [];
		for (let index = 0; index < 5; index++) {
			dummyOrganizers.push(dummyOrganizer());
		} 
		const { organizersRoutes } = createOrganizersRoutes(dummyOrganizers);

		const kdbAPI = new KdbAPI(express(), '3000');
		kdbAPI.registerRoutes(organizersRoutes);
		const app = kdbAPI.app;
 
		const response = await request(app)
			.get('/v1/organizers')
			.set('Accept', 'application/json');

		expect(response.status).toEqual(200); 

		expect(response.body).toEqual({ "organizers": dummyOrganizers });
	});

});

function createOrganizersRoutes(dummyOrganizers: Organizer[]){
	const organizersRepository: OrganizersRepository = new MockOrganizersRepository(dummyOrganizers);
	const organizersService: OrganizersService = new OrganizersService(organizersRepository);
	const organizersController: OrganizersController = new OrganizersController(organizersService, new DateUtil());
	const organizersMiddleware: OrganizersMiddleware = new OrganizersMiddleware();
	const organizersRoutes: OrganizersRoutes = new OrganizersRoutes(organizersController, organizersMiddleware);
	return {organizersRepository,organizersService,organizersController,organizersMiddleware, organizersRoutes};
}