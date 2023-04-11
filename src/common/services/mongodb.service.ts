import { Collection, MongoClient } from 'mongodb';
import { Service } from 'typedi';
import debug from 'debug';
import { Organization } from '../../generatedModels/Organization.generated';
import { User } from '../../generatedModels/User.generated';

const log: debug.IDebugger = debug('app:mongodb-controller');

@Service()
export class MongoDBConnector {

	public database;
	public client;

	constructor() {
		const path = process.env.MONGO_URI || 'localhost';
		const port = process.env.MONGO_PORT || 27017;

		const uri = `mongodb://${path}:${port}`;
		this.client = new MongoClient(uri);

		const db = process.env.MONGO_DB || 'api-db';
		this.database = this.client.db(db);

		console.log('Connection to MongoDB established.');

		const cl = this.client;

		process.on('exit', async function () {
			console.log('Connection to MongoDB terminated.');

			await cl.close();
		});

	}
	public async isHealthy(): Promise<boolean> {
		const adminDB = this.client.db('admin');
		const pingResult = await adminDB.command({ ping: 1 });
	
		return pingResult.ok === 1;
	}

	public async init() {

		await this.organizations().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.users().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.users().createIndex({ email: 1}, { name: 'email_index' });


	}

	public organizations(): Collection<Organization> {
		return this.database.collection<Organization>('organizations');
	}

	public users(): Collection<User> {
		return this.database.collection<User>('users');

	}
}
