import Container, { Service } from 'typedi';
import express from 'express';
import ip from 'ip';
import { MongooseService } from '../common/services/mongoose.service';
import { ConnectionStates } from 'mongoose';

const runningMessage = `Server running at `;

export function registerStatusChecks(app: express.Application, port: string) {
	app.get('/', (req: express.Request, res: express.Response) => {
		let myIp = ip.address();
		res.status(200).send(runningMessage + `${myIp}:${port}`);
	});

	let health = Container.get(HealthCheck); 
	app.get('/v1/health', (req: express.Request, res: express.Response) => {
		if(health.check()){
			res.status(200).send(health.getStatusDocument());
		} else {
			res.status(503).send(health.getStatusDocument());
		}
	});
}

@Service()
class HealthCheck {
	
	public repository = false;
	public lastCheck = 0;
	public intervalInMilliseconds:number = 10000;

	constructor(public mongooseService: MongooseService){}

	public check() {
		if(this.isTimeForCheck()){
			this.repository = this.mongooseService.getMongoose().connection.readyState === ConnectionStates.connected;
			this.lastCheck = Date.now();
		}
		return this.repository;
	}

	private isTimeForCheck() {
		return Date.now() - this.lastCheck > this.intervalInMilliseconds;
	}

	public getStatusDocument () {
		return {
			"healthy": this.repository,
			"dependencies": [
			  {
				"name": "repository",
				"healthy": this.repository
			  }
			]
		  }
	}

}