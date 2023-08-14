import express, { Router } from 'express';
import { Service } from "typedi";
import { TagsController } from "./controllers/tags.controller";
import { CreateTagRequest } from '../../generated/models/CreateTagRequest.generated';


@Service()
export class TagsRoutes {

	constructor(public tagsController: TagsController) { }

	public getRouter(): Router {
		let router = express.Router();

		router
			.get('/', (req: express.Request, res: express.Response) => {
					this.tagsController.listTags(res);
			})
			.post('/', (req: express.Request, res: express.Response) => {
				const createTagRequest = req.body as CreateTagRequest;
				this.tagsController.createTag(res, createTagRequest);
			});
		
		router
			.get('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
					this.tagsController.getTagById(res, identifier);
			})
		return router;
	}

}
