import { MongoClient } from 'mongodb';


class MongoDBConnector {
  private uri: string;
  private client: MongoClient;
  
  constructor(uri: string) {
    this.uri = uri;
    this.client = new MongoClient(this.uri);
  }
  
  public connectToMongoDB(): void {
	const uri = "<connection string uri>";
	const client = new MongoClient(uri);
	async function run() {
	  try {
		const database = client.db('sample_mflix');
		const movies = database.collection('movies');
		// Query for a movie that has the title 'Back to the Future'
		const query = { title: 'Back to the Future' };
		const movie = await movies.findOne(query);
		console.log(movie);
	  } finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	  }
	}
	run().catch(console.dir);
  }
}

// Usage
const connector = new MongoDBConnector('mongodb://localhost:27017/mydb');
connector.connectToMongoDB();
