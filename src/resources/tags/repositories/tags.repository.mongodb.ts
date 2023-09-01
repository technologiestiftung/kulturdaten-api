import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { TagsRepository } from "./tags.repository";
import { Filter } from "../../../generated/models/Filter.generated";
import { Tag } from "../../../generated/models/Tag.generated";
import { CreateTagRequest } from "../../../generated/models/CreateTagRequest.generated";


@Service()
export class MongoDBTagsRepository implements TagsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }
	async searchTags(filter: Filter): Promise<Tag[]> {
		const tags = await this.dbConnector.tags();
		return  tags
			.find(filter, { projection: { _id: 0 } })
			.toArray();

	}
	async getTags(): Promise<Tag[]> {
		const tags = await this.dbConnector.tags();
		return tags
			.find({}, { projection: { _id: 0 } })
			.toArray();
	}

	async getAllTags(): Promise<Tag[]> {
		const tags = await this.dbConnector.tags();
		return tags
			.find({}, { projection: { _id: 0 } })
			.toArray();
	}
	async getTagByIdentifier(tagId: string): Promise<Tag | null> {
		const tags = await this.dbConnector.tags();
		return tags.findOne({ identifier: tagId }, { projection: { _id: 0 } });

	}

	async addTag(createTagRequest: CreateTagRequest): Promise<Tag | null> {
		const tags = await this.dbConnector.tags();
		const result = await tags.insertOne(createTagRequest);

		if (!result.acknowledged) {
			return null;
		}
		return createTagRequest as Tag;
	}

}