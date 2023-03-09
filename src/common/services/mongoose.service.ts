import mongoose from 'mongoose';
import debug from 'debug';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:mongoose-service');

@Service()
export class MongooseService {
	private count = 0;
	private mongooseOptions = {
		// TODO: longer timeout in production - use default timeout
		serverSelectionTimeoutMS: 5000,
	};

	constructor() {}

	getMongoose() {
		return mongoose;
	}

	connectWithRetry = () => {
		const uri = process.env.MONGO_URI || 'localhost';
		const port = process.env.MONGO_PORT || 27017;
		const db = process.env.MONGO_DB || 'api-db';
		log('Attempting MongoDB connection (will retry if needed)');
		mongoose.set('strictQuery', true);
		mongoose
			.connect(`mongodb://${uri}:${port}/${db}`, this.mongooseOptions)
			.then(() => {
				log('MongoDB is connected');
			})
			.catch((err) => {
				const retrySeconds = 5;
				log(
					`MongoDB connection unsuccessful (will retry #${++this
						.count} after ${retrySeconds} seconds):`,
					err
				);
				setTimeout(this.connectWithRetry, retrySeconds * 1000);
			});
	};
}