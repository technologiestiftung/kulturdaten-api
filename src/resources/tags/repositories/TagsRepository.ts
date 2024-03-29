import debug from "debug";
import { CreateTagRequest } from "../../../generated/models/CreateTagRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Tag } from "../../../generated/models/Tag.generated";

const log: debug.IDebugger = debug("app:locations-repository");

export interface TagsRepository {
	addTag(createTagRequest: CreateTagRequest): PromiseLike<Tag | null>;

	searchTags(filter?: Filter): Promise<Tag[]>;

	getTags(): Promise<Tag[]>;

	getAllTags(): Promise<Tag[]>;

	getTagByIdentifier(tagId: string): Promise<Tag | null>;
}
