import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { AttractionsRepository } from "./attractions.repository";
import { generateID } from "../../../utils/IDUtil";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Filter } from "../../../generated/models/Filter.generated";


@Service()
export class MongoDBAttractionsRepository implements AttractionsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }
	async searchAttractions(filter: Filter): Promise<Attraction[]> {
		const attractions = await this.dbConnector.attractions();
		return Promise.resolve(attractions.find(filter, { projection: { _id: 0 } }).toArray());
	}

	async getAttractions(limit: number, page: number): Promise<Attraction[]> {
		const attractions = await this.dbConnector.attractions();
		return attractions.find({}, { projection: { _id: 0 } }).toArray();
	}

	async addAttraction(createAttraction: CreateAttractionRequest) : Promise<Reference | null> {
		const newAttraction = createAttraction as Attraction;
		newAttraction.identifier = generateID();

		const attractions = await this.dbConnector.attractions();
		const result = await attractions.insertOne(newAttraction);
		

		if(!result.acknowledged){
			return Promise.resolve(null);
		}
		return {
			referenceType: 'type.Attraction',
			referenceId: newAttraction.identifier,
			referenceLabel: newAttraction.displayName? newAttraction.displayName : newAttraction.title
		};
	}

	async getAttractionByIdentifier(attractionId: string): Promise<Attraction | null> {
		const attractions = await this.dbConnector.attractions();
		return attractions.findOne({ identifier: attractionId }, { projection: { _id: 0 } });
	}

	async updateAttractionById(attractionId: string, attractionFields: UpdateAttractionRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne({ identifier: attractionId }, { $set: attractionFields });
		return Promise.resolve(result.modifiedCount === 1);
	}

	async updateAttractionStatusById(attractionId: string, newStatus:  Attraction['status']): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne({ identifier: attractionId }, { $set: { status: newStatus } });
		return Promise.resolve(result.modifiedCount === 1);
	}

	async removeAttractionById(attractionId: string): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.deleteOne({ identifier: attractionId });
		return Promise.resolve(result.deletedCount === 1);
	}

	async searchDuplicates(attraction: Attraction): Promise<Attraction[]> {
		const attractions = await this.dbConnector.attractions();
		const query = {
			'origin.originId': attraction.metadata?.originObjectID,
			'origin.name': attraction.metadata?.origin
		};
		const response = await attractions.find(query).toArray();
		return response;
	}


	async addExternalLink(attractionId: string, externalLink: AddExternalLinkRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne({ identifier: attractionId },
			{ $push: { externalLinks: externalLink } });
		return Promise.resolve(result.modifiedCount === 1);
	}


	async removeExternalLink(attractionId: string, externalLink: RemoveExternalLinkRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne(
			{ identifier: attractionId },
			{ $pull: { externalLinks: { url: externalLink } } }
		  );
		return Promise.resolve(result.modifiedCount === 1);
	}

}
