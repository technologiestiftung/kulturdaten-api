import { Inject, Service } from "typedi";
import { MongoDBConnector } from "../../../common/services/mongodb.service";
import { AttractionsRepository } from "./attractions.repository";
import { generateAttractionID } from "../../../utils/IDUtil";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { getAttractionReferenceProjection } from "../../../utils/ReferenceUtil";
import { generateAttractionReference } from "../../../utils/ReferenceUtil";


@Service()
export class MongoDBAttractionsRepository implements AttractionsRepository {

	constructor(@Inject('DBClient') private dbConnector: MongoDBConnector) { }
	async searchAttractions(filter: Filter, page:number, pageSize:number): Promise<Attraction[]> {
		const attractions = await this.dbConnector.attractions();
		return attractions
			.find(filter, { projection: { _id: 0 } })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray();
	}

	async getAttractions(page:number, pageSize:number): Promise<Attraction[]> {
			const attractions = await this.dbConnector.attractions();
			return attractions
			  .find({}, { projection: { _id: 0 } })
			  .limit(pageSize)
			  .skip((page - 1) * pageSize)
			  .toArray();
	}

	async getAttractionsAsReferences(page:number, pageSize:number): Promise<Reference[]>{
		const attractions = await this.dbConnector.attractions();
		let ar =  attractions
			.find({}, { projection: getAttractionReferenceProjection() })
			.limit(pageSize)
			.skip((page - 1) * pageSize)
			.toArray() ;
		return ar as Promise<Reference[]>;
	}


	async addAttraction(createAttraction: CreateAttractionRequest) : Promise<Reference | null> {
		const newAttraction = createAttraction as Attraction;
		newAttraction.identifier = generateAttractionID();

		const attractions = await this.dbConnector.attractions();
		const result = await attractions.insertOne(newAttraction);
		
		if(!result.acknowledged){
			return null;
		}
		return generateAttractionReference(newAttraction);
	}

	async getAttractionByIdentifier(attractionId: string): Promise<Attraction | null> {
		const attractions = await this.dbConnector.attractions();
		return attractions.findOne({ identifier: attractionId }, { projection: { _id: 0 } });
	}


	async getAttractionReferenceByIdentifier(attractionId: string) : Promise<Reference | null> {
		const attractions = await this.dbConnector.attractions();
		return attractions.findOne({ identifier: attractionId }, { projection:  getAttractionReferenceProjection()}) as Reference;
	}

	async updateAttractionById(attractionId: string, attractionFields: UpdateAttractionRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne({ identifier: attractionId }, { $set: attractionFields });
		return result.modifiedCount === 1;
	}

	async updateAttractionStatusById(attractionId: string, newStatus:  Attraction['status']): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne({ identifier: attractionId }, { $set: { status: newStatus } });
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
		return result.modifiedCount === 1;
	}


	async removeExternalLink(attractionId: string, externalLink: RemoveExternalLinkRequest): Promise<boolean> {
		const attractions = await this.dbConnector.attractions();
		const result = await attractions.updateOne(
			{ identifier: attractionId },
			{ $pull: { externalLinks: { url: externalLink } } }
		  );
		return result.modifiedCount === 1;
	}

	async countAttractions(filter?: Filter): Promise<number> {
		const attractions = await this.dbConnector.attractions();
		if (filter){
			return attractions.countDocuments(filter);
		}
		return attractions.countDocuments();
	}

}
