/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConnector } from '../../common/services/mongodb.service';

// This is an Example test, do not merge it with others and do not delete this file

describe('Single MongoMemoryServer', () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;
  let connector: MongoDBConnector;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({instance: {dbName:'api-db'}});
	  process.env.MONGO_URI = mongoServer.getUri();
    con = await MongoClient.connect(mongoServer.getUri(), {});
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

	
    const col = db.collection('test');
    const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
    expect(result.insertedCount).toStrictEqual(2);
    expect(await col.countDocuments({})).toBe(2);
  });
});