import { Service } from 'typedi';
import { Response } from 'express';
import { CreateAttractionRequest } from '../../../generated/models/CreateAttractionRequest.generated';
import { SearchAttractionsRequest } from '../../../generated/models/SearchAttractionsRequest.generated';
import { UpdateAttractionRequest } from '../../../generated/models/UpdateAttractionRequest.generated';
import { AddExternalLinkRequest } from '../../../generated/models/AddExternalLinkRequest.generated';
import { RemoveExternalLinkRequest } from '../../../generated/models/RemoveExternalLinkRequest.generated';
import { SuccessResponseBuilder, ErrorResponseBuilder } from '../../../common/responses/response.builders';
import { AttractionsService } from '../services/attractions.service';
import { GetAttractionsResponse } from '../../../generated/models/GetAttractionsResponse.generated';
import { CreateAttractionResponse } from '../../../generated/models/CreateAttractionResponse.generated';
import { SearchAttractionsResponse } from '../../../generated/models/SearchAttractionsResponse.generated';
import { GetAttractionResponse } from '../../../generated/models/GetAttractionResponse.generated';

@Service()
export class AttractionsController {

  constructor(
		public attractionsService: AttractionsService) { }
  
  async listAttractions(res: Response) {
    const attractions = await this.attractionsService.list(100, 0);
    res.status(200).send(new SuccessResponseBuilder<GetAttractionsResponse>().okResponse({ attractions: attractions }).build());
  }

  async createAttraction(res: Response, createAttractionRequest: CreateAttractionRequest) {
    const attractionId = await this.attractionsService.create(createAttractionRequest);
		res.status(201).send(new SuccessResponseBuilder<CreateAttractionResponse>().okResponse({ attractionIdentifier: attractionId } ).build());
  }

  public async searchAttractions(res: Response, searchAttractionsRequest: SearchAttractionsRequest) {
    const attractions = await this.attractionsService.search(searchAttractionsRequest);
    if (attractions) {
        res.status(200).send(new SuccessResponseBuilder<SearchAttractionsResponse>().okResponse({ attractions: attractions }).build());
    } else {
        res.status(404).send(new ErrorResponseBuilder().notFoundResponse("No attractions matched the search criteria").build());
    }
  }

  async getAttractionById(res: Response, identifier: string) {
    const attraction = await this.attractionsService.readById(identifier);
		if (attraction) {
			res.status(200).send(new SuccessResponseBuilder<GetAttractionResponse>().okResponse({ attraction: attraction }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Attraction not found").build());
		}
  }

  public async updateAttraction(res: Response, identifier: string, updateAttractionRequest: UpdateAttractionRequest): Promise<void> {
    const isUpdated = await this.attractionsService.update(identifier, updateAttractionRequest);
    if (isUpdated) {
        res.status(200).send();
    } else {
        res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the attraction").build());
    }
  }

  public async addExternalLink(res: Response, identifier: string, addExternalLinkRequest: AddExternalLinkRequest): Promise<void> {
    const isAdded = await this.attractionsService.addExternalLink(identifier, addExternalLinkRequest);
    if (isAdded) {
      res.status(200).send();
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to add external link to the attraction").build());
    }
  }

  public async removeExternalLink(res: Response, identifier: string, removeExternalLinkRequest: RemoveExternalLinkRequest): Promise<void> {
    const isRemoved = await this.attractionsService.removeExternalLink(identifier, removeExternalLinkRequest);
    if (isRemoved) {
      res.status(204).send();
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to remove external link from the attraction").build());
    }
  }

  public async archiveAttraction(res: Response, identifier: string): Promise<void> {
    const isArchived = await this.attractionsService.archive(identifier);
    if (isArchived) {
      res.status(200).send();
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to archive the attraction").build());
    }
  }

  public async unarchiveAttraction(res: Response, identifier: string): Promise<void> {
    const isUnarchived = await this.attractionsService.unarchive(identifier);
    if (isUnarchived) {
      res.status(200).send();
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unarchive the attraction").build());
    }
  }

  public async publishAttraction(res: Response, identifier: string): Promise<void> {
    const isPublished = await this.attractionsService.publish(identifier);
    if (isPublished) {
      res.status(200).send();
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to publish the attraction").build());
    }
  }

  public async unpublishAttraction(res: Response, identifier: string): Promise<void> {
    const isUnpublished = await this.attractionsService.unpublish(identifier);
    if (isUnpublished) {
      res.status(200).send();
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unpublish the attraction").build());
    }
  }

}
