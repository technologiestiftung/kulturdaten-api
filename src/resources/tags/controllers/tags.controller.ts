import express from 'express';
import { Service } from "typedi";
import { TagsService } from "../services/tags.service";
import { SuccessResponseBuilder, ErrorResponseBuilder } from "../../../common/responses/response.builders";


@Service()
export class TagsController {

	constructor(public tagsService: TagsService) { }

	async listTags(res: express.Response) {
		const tags = await this.tagsService.list(100, 0);
		if (tags) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ tags: tags }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Tags not found").build());
		}
	}


	}