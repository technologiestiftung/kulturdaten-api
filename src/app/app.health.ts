import express from 'express';
import ip from 'ip';


const runningMessage = `Server running at `;

export function registerHealthCheck(app: express.Application, port: string) {
	app.get('/', (req: express.Request, res: express.Response) => {
		let myIp = ip.address();
		res.status(200).send(runningMessage + `${myIp}:${port}`);
	});
}