import { Inject, Service } from "typedi";
import { TagsRepository } from "../repositories/tags.repository";
import { SearchTagsRequest } from "../../../generated/models/SearchTagsRequest.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { CreateTagRequest } from "../../../generated/models/CreateTagRequest.generated";




@Service()
export class TagsService{

	constructor(@Inject('TagsRepository') public tagsRepository: TagsRepository){}

	async list(limit: number, page: number) {
		return this.tagsRepository.getTags(limit,page);
	}

	search(searchTagsRequest: SearchTagsRequest) : Promise<Tag[]> {
		return this.tagsRepository.searchTags(searchTagsRequest.searchFilter? searchTagsRequest.searchFilter : {});
	}

	async readById(id: string) : Promise<Tag | null> {
		return this.tagsRepository.getTagByIdentifier(id);
	}

	async create(createTagRequest: CreateTagRequest) : Promise<Tag | null> {
		return this.tagsRepository.addTag(createTagRequest);
	}


}