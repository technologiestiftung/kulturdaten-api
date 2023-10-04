import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { MongoDBConnector } from "../../../common/services/MongoDBConnector";
import { MONGO_DB_DEFAULT_PROJECTION } from "../../../config/Config";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { generateAttractionID } from "../../../utils/IDUtil";
import { createMetadata, getUpdatedMetadata } from "../../../utils/MetadataUtil";
import { generateAttractionReference, getAttractionReferenceProjection } from "../../../utils/ReferenceUtil";
import { AttractionsRepository } from "./AttractionsRepository";

@Service()
export class MongoDBAttractionsRepository implements AttractionsRepository {
	constructor(@Inject("DBClient") private dbConnector: MongoDBConnector) {}

	async get(filter?: Filter, projection?: any, pagination?: Pagination): Promise<any[]> {
		const attractions = await this.dbConnector.attractions();
		let query = attractions.find(filter || {}, {
			projection: projection ? { ...projection, ...MONGO_DB_DEFAULT_PROJECTION } : MONGO_DB_DEFAULT_PROJECTION,
		});
		if (pagination) {
			query = query.limit(pagination.pageSize).skip((pagination.page - 1) * pagination.pageSize);
		}
		return query.toArray();
	}

	async searchAttractions(filter?: Filter, pagination?: Pagination): Promise<Attraction[]> {
		return this.get(filter, undefined, pagination);
	}

	async searchAllAttractions(filter: Filter, projection?: object): Promise<Attraction[]> {
		return this.get(filter, projection, undefined);
	}

	async getAttractions(pagination?: Pagination): Promise<Attraction[]> {
		return this.get(undefined, undefined, pagination);
	}

	async getAttractionsAsReferences(pagination?: Pagination): Promise<Reference[]> {
		return this.get(undefined, getAttractionReferenceProjection(), pagination);
	}

	async addAttraction(createAttraction: CreateAttractionRequest): Promise<Reference | null> {
		const newAttraction: Attraction = {
			...createAttraction,
			type: "type.Attraction",
			identifier: generateAttractionID(),
			metadata: createMetadata(createAttraction.metadata),
		};
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.insertOne(newAttraction);
		if (!result.acknowledged) {
			return null;
		}
		return generateAttractionReference(newAttraction);
	}

	async getAttractionByIdentifier(attractionId: string): Promise<Attraction | null> {
		const attractions = await this.dbConnector.attractions();
		return attractions.findOne({ identifier: attractionId }, { projection: { _id: 0 } });
	}

	async getAttractionReferenceByIdentifier(attractionId: string): Promise<Reference | null> {
		const attractions = await this.dbConnector.attractions();
		return attractions.findOne(
			{ identifier: attractionId },
			{ projection: getAttractionReferenceProjection() },
		) as Reference;
	}

	async updateAttractionById(attractionId: string, attractionFields: UpdateAttractionRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne(
			{ identifier: attractionId },
			{
				$set: {
					...attractionFields,
					...getUpdatedMetadata(),
				},
			},
		);
		return result.modifiedCount === 1;
	}

	async updateAttractionStatusById(attractionId: string, newStatus: Attraction["status"]): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne(
			{ identifier: attractionId },
			{
				$set: {
					status: newStatus,
					...getUpdatedMetadata(),
				},
			},
		);
		return result.modifiedCount === 1;
	}

	async removeAttractionById(attractionId: string): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.deleteOne({ identifier: attractionId });
		return result.deletedCount === 1;
	}

	async searchDuplicates(attraction: Attraction): Promise<Attraction[]> {
		const attractions = await this.dbConnector.attractions();
		const query = {
			"origin.originId": attraction.metadata?.originObjectID,
			"origin.name": attraction.metadata?.origin,
		};
		const response = await attractions.find(query).toArray();
		return response;
	}

	async addExternalLink(attractionId: string, externalLink: AddExternalLinkRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne(
			{ identifier: attractionId },
			{
				$push: { externalLinks: externalLink },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async removeExternalLink(attractionId: string, externalLink: RemoveExternalLinkRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne(
			{ identifier: attractionId },
			{
				$pull: { externalLinks: { url: externalLink } },
				$set: getUpdatedMetadata(),
			},
		);
		return result.modifiedCount === 1;
	}

	async countAttractions(filter?: Filter): Promise<number> {
		const attractions = await this.dbConnector.attractions();
		return attractions.countDocuments(filter);
	}
}
