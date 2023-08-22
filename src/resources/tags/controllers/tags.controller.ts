import express from 'express';
import { Service } from "typedi";
import { TagsService } from "../services/tags.service";
import { SuccessResponseBuilder, ErrorResponseBuilder } from "../../../common/responses/response.builders";
import { CreateTagRequest } from '../../../generated/models/CreateTagRequest.generated';
import { CreateTagResponse } from '../../../generated/models/CreateTagResponse.generated';
import { GetTagResponse } from '../../../generated/models/GetTagResponse.generated';
import { SearchTagsRequest } from '../../../generated/models/SearchTagsRequest.generated';
import { SearchTagsResponse } from '../../../generated/models/SearchTagsResponse.generated';


@Service()
export class TagsController {
	
	constructor(public tagsService: TagsService) { }

	async listTags(res: express.Response, page: number, pageSize: number) {
		const tags = await this.tagsService.list(100, 0);
		if (tags) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ tags: tags }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Tags not found").build());
		}
	}

	async getTagById(res: express.Response, identifier: string) {
		const tag = await this.tagsService.readById(identifier);
		if (tag) {
		  res.status(200).send(new SuccessResponseBuilder<GetTagResponse>().okResponse({ attraction: tag }).build());
		} else {
		  res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Tag not found").build());
		}
	}

	async searchTags(res: express.Response, searchTagsRequest: SearchTagsRequest, page: number, pageSize: number) {
		const tags = await this.tagsService.search(searchTagsRequest);
		if (tags) {
		  res.status(200).send(new SuccessResponseBuilder<SearchTagsResponse>().okResponse({ tags: tags }).build());
		} else {
		  res.status(404).send(new ErrorResponseBuilder().notFoundResponse("No tags matched the search criteria").build());
		}
	}

	async createTag(res: express.Response, createTagRequest: CreateTagRequest) {
		const tag = await this.tagsService.create(createTagRequest);
		if (tag) {
		  res.status(201).send(new SuccessResponseBuilder<CreateTagResponse>().okResponse({ tag: tag }).build());
		} else {
		  res.status(400).send(new ErrorResponseBuilder().badRequestResponse("A tag cannot be created with the data.").build());
		}
	}


	}