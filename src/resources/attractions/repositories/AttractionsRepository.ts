import debug from "debug";
import { Pagination } from "../../../common/parameters/Pagination";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";

const log: debug.IDebugger = debug("app:attractions-repository");

export interface AttractionsRepository {
	getAttractions(pagination?: Pagination, filter?: Filter): Promise<Attraction[]>;

	getAttractionsAsReferences(pagination?: Pagination, filter?: Filter): Promise<Reference[]>;

	searchAttractions(filter?: Filter, pagination?: Pagination): Promise<Attraction[]>;

	searchAllAttractions(filter: Filter, projection?: object): Promise<Attraction[]>;

	countAttractions(filter?: Filter): Promise<number>;

	addAttraction(createAttraction: CreateAttractionRequest, creator?: AuthUser): Promise<Reference | null>;

	getAttractionByIdentifier(attractionId: string): Promise<Attraction | null>;

	getAttractionReferenceByIdentifier(attractionId: string): Promise<Reference | null>;

	updateAttractionById(attractionId: string, attractionFields: UpdateAttractionRequest): Promise<boolean>;

	updateAttractionStatusById(attractionId: string, newStatus: Attraction["status"]): Promise<boolean>;

	removeAttractionById(attractionId: string): Promise<boolean>;

	addExternalLink(attractionId: string, externalLink: AddExternalLinkRequest): Promise<boolean>;

	removeExternalLink(attractionId: string, externalLink: RemoveExternalLinkRequest): Promise<boolean>;
}
