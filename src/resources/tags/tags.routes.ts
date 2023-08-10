import express, { Router } from 'express';
import { Service } from "typedi";
import { TagsController } from "./controllers/tags.controller";


@Service()
export class TagsRoutes {

	constructor(public tagsController: TagsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get('/', (req: express.Request, res: express.Response) => {
					this.tagsController.listTags(res);
			})

		return router;
	}

}
