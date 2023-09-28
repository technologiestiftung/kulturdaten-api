import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/MongoDBConnector";
import { CreateTagRequest } from "../../../generated/models/CreateTagRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { generateTagID } from "../../../utils/IDUtil";
import { createMetadata } from "../../../utils/MetadataUtil";
import { TagsRepository } from "./TagsRepository";

@Service()
export class MongoDBTagsRepository implements TagsRepository {
	constructor(@Inject("DBClient") private dbConnector: MongoDBConnector) {}

	async searchTags(filter: Filter): Promise<Tag[]> {
		const tags = await this.dbConnector.tags();
		return tags.find(filter, { projection: { _id: 0 } }).toArray();
	}

	async getTags(): Promise<Tag[]> {
		const tags = await this.dbConnector.tags();
		return tags.find({}, { projection: { _id: 0 } }).toArray();
	}

	async getAllTags(): Promise<Tag[]> {
		const tags = await this.dbConnector.tags();
		return tags.find({}, { projection: { _id: 0 } }).toArray();
	}

	async getTagByIdentifier(tagId: string): Promise<Tag | null> {
		const tags = await this.dbConnector.tags();
		return tags.findOne({ identifier: tagId }, { projection: { _id: 0 } });
	}

	async addTag(createTagRequest: CreateTagRequest): Promise<Tag | null> {
		const tags = await this.dbConnector.tags();
		const newTag: Tag = {
			...createTagRequest,
			identifier: generateTagID(),
			metadata: {
				...createTagRequest.metadata,
				...createMetadata(),
			},
		};
		const result = await tags.insertOne(newTag);
		if (!result.acknowledged) {
			return null;
		}
		return newTag;
	}
}
