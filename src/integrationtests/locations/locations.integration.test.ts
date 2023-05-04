/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../../common/services/mongodb.service';
import { MongoDBLocationsRepository } from '../../locations/repositories/locations.repository.mobgodb';
import { LocationsService } from '../../locations/services/locations.service';
import { LocationsController } from '../../locations/controllers/locations.controller';
import { LocationsRoutes } from '../../locations/locations.routes';
import express from 'express';
import request from "supertest";
import { validateLocation } from '../../generated/models/Location.generated';

// This is an Example test, do not merge it with others and do not delete this file

describe('Single MongoMemoryServer', () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;
  let connector: MongoDBConnector;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({ instance: { dbName: 'api-db' } });
    process.env.MONGO_URI = mongoServer.getUri();
    con = await MongoClient.connect(mongoServer.getUri(), {});
    connector = new MongoDBConnector(con);
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
    if (connector) {
      await connector.close();
    }
  });

  it('should successfully set & get information from the database', async () => {
    const db = con.db(mongoServer.instanceInfo!.dbName);
    expect(db).toBeDefined();

    const adminDB = con.db('admin');
    const pingResult = await adminDB.command({ ping: 1 });

    expect(pingResult.ok).toBe(1);
    //const healthy = await connector.isHealthy();
    //expect(healthy).toBe(true);

    const col = db.collection('test');
    const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
    expect(result.insertedCount).toStrictEqual(2);
    expect(await col.countDocuments({})).toBe(2);
  });

  it('should ', async () => {
    const locationsRepository = new MongoDBLocationsRepository(connector);
    const locationsService = new LocationsService(locationsRepository);
    const locationsController = new LocationsController(locationsService);
    const locationsRoutes = new LocationsRoutes(locationsController);

    const app = express();
    app.use(express.json());

    app.use('/v1/locations', locationsRoutes.getRouter());

    const { body, statusCode } = await request(app).get('/v1/locations');

		expect(statusCode).toBe(200);

		body.locations.forEach((o: object) => {
			let val = validateLocation(o);
			expect(val.isValid).toBe(true);
		});

  })
});