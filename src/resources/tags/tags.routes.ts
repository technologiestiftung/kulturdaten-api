import express, { Router } from 'express';
import { Service } from "typedi";
import { TagsController } from "./controllers/tags.controller";
import { CreateTagRequest } from '../../generated/models/CreateTagRequest.generated';
import { fakeSearchTagsRequest } from '../../generated/faker/faker.SearchTagsRequest.generated';
import { SearchTagsRequest } from '../../generated/models/SearchTagsRequest.generated';
import { getPagination } from '../../utils/RequestUtil';


@Service()
export class TagsRoutes {

	constructor(public tagsController: TagsController) { }

	public getRouter(): Router {
		const router = express.Router();

		router
			.get('/', (req: express.Request, res: express.Response) => {
					const { page, pageSize} = getPagination(req);
					this.tagsController.listTags(res, page, pageSize);
			})
			.post('/', (req: express.Request, res: express.Response) => {
				const createTagRequest = req.body as CreateTagRequest;
				this.tagsController.createTag(res, createTagRequest);
			});

		router
			.get('/organizations', (req: express.Request, res: express.Response) => {
				const { page, pageSize} = getPagination(req);

				const searchTagsRequest : SearchTagsRequest = {
					searchFilter: {
						identifier: { $regex: "organization\\." }
					}
				}
				this.tagsController.searchTags(res, searchTagsRequest, page, pageSize);
			})
		
		router
			.get('/attractions', (req: express.Request, res: express.Response) => {
				const { page, pageSize} = getPagination(req);

				const searchTagsRequest : SearchTagsRequest = {
					searchFilter: {
						identifier: { $regex: "attraction\\." }
					}
				}
				this.tagsController.searchTags(res, searchTagsRequest, page, pageSize);
			})

		router
			.get('/locations', (req: express.Request, res: express.Response) => {
				const { page, pageSize} = getPagination(req);

				const searchTagsRequest : SearchTagsRequest = {
					searchFilter: {
						identifier: { $regex: "location\\." }
					}
				}
				this.tagsController.searchTags(res, searchTagsRequest, page, pageSize);
			})

		router
			.get('/events', (req: express.Request, res: express.Response) => {
				const { page, pageSize} = getPagination(req);

				const searchTagsRequest : SearchTagsRequest = {
					searchFilter: {
						identifier: { $regex: "event\\." }
					}
				}
				this.tagsController.searchTags(res, searchTagsRequest, page, pageSize);
			})

		router
			.get('/:identifier', (req: express.Request, res: express.Response) => {
				const identifier = req.params.identifier;
					this.tagsController.getTagById(res, identifier);
			})
		

		return router;
	}

}
