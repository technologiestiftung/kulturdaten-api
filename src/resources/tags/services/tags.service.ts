import { Inject, Service } from "typedi";
import { CreateTagRequest } from "../../../generated/models/CreateTagRequest.generated";
import { SearchTagsRequest } from "../../../generated/models/SearchTagsRequest.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { TagsRepository } from "../repositories/TagsRepository";

@Service()
export class TagsService {
	constructor(@Inject("TagsRepository") public tagsRepository: TagsRepository) {}

	async list() {
		return this.tagsRepository.getTags();
	}

	async listAllTags(): Promise<Tag[]> {
		return this.tagsRepository.getAllTags();
	}

	search(searchTagsRequest: SearchTagsRequest): Promise<Tag[]> {
		return this.tagsRepository.searchTags(searchTagsRequest.searchFilter);
	}

	async readById(id: string): Promise<Tag | null> {
		return this.tagsRepository.getTagByIdentifier(id);
	}

	async create(createTagRequest: CreateTagRequest): Promise<Tag | null> {
		return this.tagsRepository.addTag(createTagRequest);
	}
}
