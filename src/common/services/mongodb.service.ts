import { Collection, MongoClient } from 'mongodb';
import { Service } from 'typedi';
import { Organizer } from '../../organizers/models/organizer.generated';
import { User } from '../../users/models/user.generated';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongodb-controller');

@Service()
export class MongoDBConnector {

	public database;

	constructor() {
		const path = process.env.MONGO_URI || 'localhost';
		const port = process.env.MONGO_PORT || 27017;

		const uri = `mongodb://${path}:${port}`;
		const client = new MongoClient(uri);

		const db = process.env.MONGO_DB || 'api-db';
		this.database = client.db(db);

		console.log('Connection to MongoDB established.');

		process.on('exit', async function () {
			console.log('Connection to MongoDB terminated.');

			await client.close();
		});
	}

	public async initIndices() {

		await this.organizers().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.users().createIndex({ identifier: 1 },{ name: 'id_index' });
		await this.users().createIndex({ email: 1}, { name: 'email_index' })
	}

	public organizers(): Collection<Organizer> {
		return this.database.collection<Organizer>('organizers');
	}

	public users(): Collection<User> {
		return this.database.collection<User>('users');

	}
}
