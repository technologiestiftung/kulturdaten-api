import { Collection, Db, MongoClient } from 'mongodb';
import { Service } from 'typedi';
import debug from 'debug';
import { Organization } from '../../generated/models/Organization.generated';
import { User } from '../../generated/models/User.generated';
import { Event } from '../../generated/models/Event.generated';
import { Location } from '../../generated/models/Location.generated';

const log: debug.IDebugger = debug('app:mongodb-controller');

@Service()
export class MongoDBConnector {

	public database : Db;
	public client : MongoClient;

	constructor(database: Db, client: MongoClient) {
		this.database = database;
		this.client = client;
	}
	public async isHealthy(): Promise<boolean> {
		const adminDB = this.client.db('admin');
		const pingResult = await adminDB.command({ ping: 1 });
	
		return pingResult.ok === 1;
	}

	public async initIndex() {
		await this.organizations().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.users().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.users().createIndex({ email: 1}, { name: 'email_index' });
		await this.events().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.locations().createIndex({ identifier: 1 },{ name: 'id_index' });
	}

	public organizations(): Collection<Organization> {
		return this.database.collection<Organization>('organizations');
	}

	public users(): Collection<User> {
		return this.database.collection<User>('users');
	}

	public events(): Collection<Event> {
		return this.database.collection<Event>('events');
	}

	public locations(): Collection<Location> {
		return this.database.collection<Location>('locations');
	}

	public async close() {
		await this.client.close();
	}

}
