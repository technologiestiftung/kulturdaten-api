import express from 'express';
import debug from 'debug';
import { Service } from 'typedi';

const log: debug.IDebugger = debug('app:health-controller');

@Service()
export class HealthController {

	public repository = false;
	public lastCheck = 0;
	public intervalInMilliseconds:number = 10000;

	// TODO: MongoDB testen. 
	
	public check() {
		if(this.isTimeForCheck()){
			this.lastCheck = Date.now();
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
		if(this.check()){
			res.status(200).send(this.getStatusDocument());
		} else {
			res.status(503).send(this.getStatusDocument());
		}
	}
}
