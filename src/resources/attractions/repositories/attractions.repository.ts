import debug from 'debug';
import { Attraction } from '../../../generated/models/Attraction.generated';
import { CreateAttractionRequest } from '../../../generated/models/CreateAttractionRequest.generated';
import { UpdateAttractionRequest } from '../../../generated/models/UpdateAttractionRequest.generated';
import { AddExternalLinkRequest } from '../../../generated/models/AddExternalLinkRequest.generated';
import { RemoveExternalLinkRequest } from '../../../generated/models/RemoveExternalLinkRequest.generated';
import { Reference } from '../../../generated/models/Reference.generated';
import { Filter } from '../../../generated/models/Filter.generated';


const log: debug.IDebugger = debug('app:attractions-repository');

export interface AttractionsRepository {
	getAttractions(limit:number, page:number) : Promise<Attraction[]>;

	getAttractionsAsReferences(limit: number, page: number): Promise<Reference[]>;

	addAttraction(createAttraction: CreateAttractionRequest): Promise<Reference | null>;

	searchDuplicates(attraction: Attraction): Promise<Attraction[]>;

	searchAttractions(filter: Filter): Promise<Attraction[]> ;

	getAttractionByIdentifier(attractionId: string) : Promise<Attraction | null>;

	getAttractionReferenceByIdentifier(attractionId: string) : Promise<Reference | null>;

	updateAttractionById(attractionId: string, attractionFields: UpdateAttractionRequest ): Promise<boolean>;

	updateAttractionStatusById(attractionId: string, newStatus: Attraction['status']): Promise<boolean>;

	removeAttractionById(attractionId: string) :  Promise<boolean>;
	
	searchDuplicates(attraction: Attraction): Promise<Attraction[]>;

	addExternalLink(attractionId: string, externalLink: AddExternalLinkRequest): Promise<boolean>;

	removeExternalLink(attractionId: string, externalLink: RemoveExternalLinkRequest): Promise<boolean>;

}

