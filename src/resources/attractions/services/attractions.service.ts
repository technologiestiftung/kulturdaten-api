import { Inject, Service } from "typedi";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { SearchAttractionsRequest } from "../../../generated/models/SearchAttractionsRequest.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { AttractionsRepository } from "../repositories/attractions.repository";
import { Reference } from "../../../generated/models/Reference.generated";
import { pagination } from "../../../config/kulturdaten.config";
import { Filter } from "../../../generated/models/Filter.generated";

@Service()
export class AttractionsService {


  constructor(@Inject('AttractionsRepository') public attractionsRepository: AttractionsRepository) { }

  async list(page: number = 1, pageSize: number = pagination.maxPageSize): Promise<Attraction[]> {
    return this.attractionsRepository.getAttractions(page, pageSize);
  }

  async listAsReferences(page: number = 1, pageSize: number = pagination.maxPageSize) : Promise<Reference []>{
    return this.attractionsRepository.getAttractionsAsReferences(page, pageSize);
  }

  async search(searchFilter: Filter, page: number = 1, pageSize: number = pagination.maxPageSize): Promise<Attraction[]> {
		return this.attractionsRepository.searchAttractions(searchFilter,  page, pageSize);
  }

  async countAttractions(searchFilter?: Filter): Promise<number> {
    return this.attractionsRepository.countAttractions(searchFilter);
  }

  async create(createAttractionRequest: CreateAttractionRequest): Promise<Reference | null> {
    return this.attractionsRepository.addAttraction(createAttractionRequest);
  }



  async readById(attractionId: any) : Promise<Attraction | null> {
    return this.attractionsRepository.getAttractionByIdentifier(attractionId);
  }

  async readReferenceById(attractionId: any) : Promise<Reference | null> {
    return this.attractionsRepository.getAttractionReferenceByIdentifier(attractionId);
  }

  async update(identifier: string, updateAttractionRequest: UpdateAttractionRequest): Promise<boolean> {
    return this.attractionsRepository.updateAttractionById(identifier, updateAttractionRequest);
  }

  async addExternalLink(identifier: string, addExternalLinkRequest: AddExternalLinkRequest): Promise<boolean> {
    return this.attractionsRepository.addExternalLink(identifier, addExternalLinkRequest);
  }

  async removeExternalLink(identifier: string, removeExternalLinkRequest: RemoveExternalLinkRequest): Promise<boolean> {
    return this.attractionsRepository.removeExternalLink(identifier, removeExternalLinkRequest);
  }

  async archive(identifier: string): Promise<boolean> {
    return this.attractionsRepository.updateAttractionStatusById(identifier, 'attraction.archived');
  }

  async unarchive(identifier: string): Promise<boolean> {
    return this.attractionsRepository.updateAttractionStatusById(identifier, 'attraction.unpublished');
  }

  async publish(identifier: string): Promise<boolean> {
    return this.attractionsRepository.updateAttractionStatusById(identifier, 'attraction.published');
  }

  async unpublish(identifier: string): Promise<boolean> {
    return this.attractionsRepository.updateAttractionStatusById(identifier, 'attraction.unpublished');
  }



}
