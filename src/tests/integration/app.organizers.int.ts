
import express from 'express';
import { expect, jest, test } from '@jest/globals';
import { KdbAPI } from '../../KdbAPI';
import request from 'supertest';
import { MockOrganizersRepository, dummyOrganizer, dummyOrganizers, dummyCreateDto } from '../mocks/MockOrganizersRepository';
import { OrganizersRoutes } from '../../organizers/organizers.routes.config';
import { Organizer } from "../../organizers/repositories/organizer";
import { OrganizersController } from '../../organizers/controllers/organizers.controller';
import { OrganizersMiddleware } from '../../organizers/middleware/organizers.middleware';
import { OrganizersService } from '../../organizers/services/organizers.service';
import { DateUtil } from '../../utils/DateUtil';
import { expectResponseSendIsEqual } from '../../utils/TestUtil';
import { PatchOrganizerDto } from '../../organizers/dtos/patch.organizer.dto';
import { PutOrganizerDto } from '../../organizers/dtos/put.organizer.dto';
import { instance, mock, when } from 'ts-mockito';


let app:express.Application;
let organizersRepository: MockOrganizersRepository;

beforeEach(() => {
	jest.clearAllMocks();
	setupServer();
});

describe('get organizers is being tested', () => {
	it('empty repo returns status 200 and empty organizers', done => {
		request(app)
			.get('/v1/organizers')
			.set('Accept', 'application/json')
			.send()
			.then(response => {
				expect(response.status).toEqual(200);
				expect(response.body).toEqual({ "organizers": [] });
				done();
			}).catch(error => { console.log('error - '); console.log(error); });


	});

	it('filles repo returns status 200 and all organizers', done => {
		let dummyOrganizers: Organizer[] = [];
		for (let index = 0; index < 5; index++) {
			dummyOrganizers.push(dummyOrganizer());
		}
		organizersRepository.dummyOrganizers = dummyOrganizers;

		request(app)
			.get('/v1/organizers')
			.set('Accept', 'application/json')
			.send()
			.then(response => {
				expect(response.status).toEqual(200);
				expect(response.body).toEqual({ "organizers": dummyOrganizers });
				done();
			}).catch(error => { console.log('error - '); console.log(error); });
	});
});

describe('post organizers is being tested', () => {
	it('post new organizer  returns status 201 and empty organizers and new ID', done => {
		let newOrganizer = { name: 'GlitzerBar', description: 'Toller Ort.' };

		request(app)
			.post('/v1/organizers')
			.set('Accept', 'application/json')
			.send(newOrganizer)
			.then(response => {
				expect(response.status).toEqual(201);
				expect(response.body).toEqual({ id: 'IDforGlitzerBar' });
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});

	it('post multiple new organizer  the same number are in the database', done => {
		const numberOfNewOrganizer = 3;

		for (let index = 0; index < numberOfNewOrganizer; index++) {
			let newOrganizer = dummyCreateDto();
			request(app)
				.post('/v1/organizers')
				.set('Accept', 'application/json')
				.send(newOrganizer)
				.then(response => {
					expect(organizersRepository.dummyOrganizers.length).toBe(numberOfNewOrganizer);
					done();
				}).catch(error => { console.log('error - '); console.log(error); });
		}
	});

});

describe('get organizers by ID is being tested', () => {
	it('no organizers with used ID returns status 404', done => {
		const id = "nonexistentID";

		request(app)
			.get(`/v1/organizers/${id}`)
			.set('Accept', 'application/json')
			.send()
			.then(response => {
				expect(response.status).toEqual(404);
				done();
			}).catch(error => { console.log('error - '); console.log(error); });
	});

	it('organizer with used ID exists returns that organizers', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		request(app)
			.get(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send()
			.then(response => {
				expect(response.status).toEqual(200);
				expect(response.body).toEqual({ organizer: organizers[0] });
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});
});

describe('put organizer is being tested', () => {
	it('put organizer correctly returns status 204', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const putOrganizer: PutOrganizerDto = {
			id: existsID || '',
			name: 'New Name',
			description: 'New Description'
		};

		request(app)
			.put(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send(putOrganizer)
			.then(response => {
				expect(response.status).toEqual(204);
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});

	it('put organizer correctly modify the organizer', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const putOrganizer: PutOrganizerDto = {
			id: existsID || '',
			name: 'New Name',
			description: 'New Description'
		};

		request(app)
			.put(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send(putOrganizer)
			.then(response => {
				expect(response.status).toEqual(204);
				request(app)
					.get(`/v1/organizers/${existsID}`)
					.set('Accept', 'application/json')
					.send()
					.then(response => {
						expect(response.body.organizer.name).toBe('New Name');
						expect(response.body.organizer.description).toBe('New Description');
					}).catch(error => { console.log('error - '); console.log(error); });	
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});

	it('put organizer correctly updated the update time', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const putOrganizer: PutOrganizerDto = {
			id: existsID || '',
			name: 'New Name',
			description: 'New Description'
		};

		request(app)
			.put(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send(putOrganizer)
			.then(response => {
				expect(response.status).toEqual(204);
				request(app)
					.get(`/v1/organizers/${existsID}`)
					.set('Accept', 'application/json')
					.send()
					.then(response => {
						expect(response.body.organizer.updated).toBe('NOW');
					}).catch(error => { console.log('error - '); console.log(error); });	
				done();
			}).catch(error => { console.log('error - '); console.log(error); });
	
	});
});

describe('patch organizer is being tested', () => {
	it('patch organizer correctly returns status 204', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const patchOrganizer: PatchOrganizerDto = {
			id: existsID || '',
			name: 'New Name',
		};

		request(app)
			.patch(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send(patchOrganizer)
			.then(response => {
				expect(response.status).toEqual(204);
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});

	it('patch organizer correctly modify the organizer', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const patchOrganizer: PatchOrganizerDto = {
			id: existsID || '',
			name: 'New Name'
		};

		request(app)
			.patch(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send(patchOrganizer)
			.then(response => {
				expect(response.status).toEqual(204);
				request(app)
					.get(`/v1/organizers/${existsID}`)
					.set('Accept', 'application/json')
					.send()
					.then(response => {
						expect(response.body.organizer.name).toBe('New Name');
					}).catch(error => { console.log('error - '); console.log(error); });	
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});

	it('patch organizer correctly updated the update time', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const patchOrganizer: PatchOrganizerDto = {
			id: existsID || '',
			name: 'New Name',
		};

		request(app)
			.patch(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send(patchOrganizer)
			.then(response => {
				expect(response.status).toEqual(204);
				request(app)
					.get(`/v1/organizers/${existsID}`)
					.set('Accept', 'application/json')
					.send()
					.then(response => {
						expect(response.body.organizer.updated).toBe('NOW');
					}).catch(error => { console.log('error - '); console.log(error); });	
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});
});

describe('delete organizer is being tested', () => {
	it('delete organizer returns status 204', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;

		const response = request(app)
			.delete(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send()
			.then(response => {
				expect(response.status).toEqual(204);
				done();
			}).catch(error => { console.log('error - '); console.log(error); });
	});

	it('delete organizer returns get status 404', done => {
		const organizers = dummyOrganizers(5);
		const existsID = organizers[0]._id;
		organizersRepository.dummyOrganizers = organizers;


		request(app)
			.delete(`/v1/organizers/${existsID}`)
			.set('Accept', 'application/json')
			.send()
			.then(response => {
				expect(response.status).toEqual(204);
				request(app)
					.get(`/v1/organizers/${existsID}`)
					.set('Accept', 'application/json')
					.send()
					.then(response => {
						expect(response.status).toEqual(404);
					}).catch(error => { console.log('error - '); console.log(error); });	
				done();
			}).catch(error => { console.log('error - '); console.log(error); });

	});
});



function setupServer() {
	app = express();
	const kdbAPI = new KdbAPI(app, '3000');
	app.use(express.json());
	const mockedDateUtil: DateUtil = mock(DateUtil);
	when(mockedDateUtil.now()).thenReturn('NOW');
	organizersRepository = new MockOrganizersRepository();
	const organizersService: OrganizersService = new OrganizersService(organizersRepository);
	const organizersController: OrganizersController = new OrganizersController(organizersService, instance(mockedDateUtil));
	const organizersMiddleware: OrganizersMiddleware = new OrganizersMiddleware();
	const organizersRoutes: OrganizersRoutes = new OrganizersRoutes(organizersController, organizersMiddleware);
	kdbAPI.registerRoutes(organizersRoutes);
}

