import { Inject, Service } from "typedi";
import { TagsRepository } from "../repositories/tags.repository";
import { SearchTagsRequest } from "../../../generated/models/SearchTagsRequest.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { CreateTagRequest } from "../../../generated/models/CreateTagRequest.generated";
import { pagination } from "../../../config/kulturdaten.config";




@Service()
export class TagsService{

	constructor(@Inject('TagsRepository') public tagsRepository: TagsRepository){}

	async list(page: number = pagination.defaultPage, pageSize: number = pagination.defaultPageSize) {
		return this.tagsRepository.getTags(page,pageSize);
	}

	search(searchTagsRequest: SearchTagsRequest, page: number = pagination.defaultPage, pageSize: number = pagination.defaultPageSize) : Promise<Tag[]> {
		return this.tagsRepository.searchTags(searchTagsRequest.searchFilter? searchTagsRequest.searchFilter : {}, page, pageSize);
	}

	async readById(id: string) : Promise<Tag | null> {
		return this.tagsRepository.getTagByIdentifier(id);
	}

	async create(createTagRequest: CreateTagRequest) : Promise<Tag | null> {
		return this.tagsRepository.addTag(createTagRequest);
	}


}