import express from 'express';
import debug from 'debug';
import { Inject, Service } from 'typedi';
import { MongoDBConnector } from '../../../common/services/mongodb.service';

const log: debug.IDebugger = debug('app:health-controller');

@Service()
export class HealthController {

	public repository = false;
	public lastCheck = 0;
	public intervalInMilliseconds:number = 10000;

	
	constructor(@Inject('Database') private repo: MongoDBConnector){}

	public async check() {
		if(this.isTimeForCheck()){
			this.lastCheck = Date.now();
			this.repository = await this.repo.isHealthy();
		}
		return this.repository;
	}

	private isTimeForCheck() {
		return Date.now() - this.lastCheck > this.intervalInMilliseconds;
	}

	private getStatusDocument () {
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

	async checkHealth(req: express.Request, res: express.Response) {
		if(await this.check()){
			res.status(200).send(this.getStatusDocument());
		} else {
			res.status(503).send(this.getStatusDocument());
		}
	}
}
