import express from 'express';
import { Service } from "typedi";
import { TagsService } from "../services/tags.service";
import { SuccessResponseBuilder, ErrorResponseBuilder } from "../../../common/responses/response.builders";
import { CreateTagRequest } from '../../../generated/models/CreateTagRequest.generated';
import { CreateTagResponse } from '../../../generated/models/CreateTagResponse.generated';


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

	async createTag(res: express.Response, createTagRequest: CreateTagRequest) {
		const tag = await this.tagsService.create(createTagRequest);
		if (tag) {
		  res.status(201).send(new SuccessResponseBuilder<CreateTagResponse>().okResponse({ tag: tag }).build());
		} else {
		  res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An attraction cannot be created with the data.").build());
		}
	}


	}