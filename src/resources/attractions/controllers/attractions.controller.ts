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
import { Reference } from '../../../generated/models/Reference.generated';

@Service()
export class AttractionsController {


  constructor(
    public attractionsService: AttractionsService) { }

  async listAttractions(res: Response, page: number, pageSize: number) {
    const attractions = await this.attractionsService.list(page, pageSize);
    const attractionsCount = await this.attractionsService.countAttractions();
    res.status(200).send(new SuccessResponseBuilder<GetAttractionsResponse>().okResponse(
      {
        page: page,
        pageSize: pageSize,
        totalCount: attractionsCount,
        attractions: attractions
      }).build());
  }

  async listAttractionsAsReference(res: Response, page: number, pageSize: number) {
    const attractionsReferences = await this.attractionsService.listAsReferences(page, pageSize);
    const attractionsCount = await this.attractionsService.countAttractions();

    res.status(200).send(new SuccessResponseBuilder<GetAttractionsResponse>().okResponse(
      {         
        page: page,
        pageSize: pageSize,
        totalCount: attractionsCount,
        attractionsReferences: attractionsReferences 
      }).build());
  }

  public async searchAttractions(res: Response, searchAttractionsRequest: SearchAttractionsRequest, page: number, pageSize: number) {
    const attractions = await this.attractionsService.search(searchAttractionsRequest, page, pageSize);
    const attractionsCount = await this.attractionsService.countAttractions();

    if (attractions) {
      res.status(200).send(new SuccessResponseBuilder<SearchAttractionsResponse>().okResponse(
        { 
          page: page,
          pageSize: pageSize,
          totalCount: attractionsCount,
          attractions: attractions 
        }).build());
    } else {
      res.status(404).send(new ErrorResponseBuilder().notFoundResponse("No attractions matched the search criteria").build());
    }
  }

  async createAttraction(res: Response, createAttractionRequest: CreateAttractionRequest) {
    const attractionReference = await this.attractionsService.create(createAttractionRequest);
    if (attractionReference) {
      res.status(201).send(new SuccessResponseBuilder<CreateAttractionResponse>().okResponse({ attractionReference: attractionReference }).build());
    } else {
      res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An attraction cannot be created with the data.").build());
    }
  }

  async createAttractions(res: Response, createAttractionRequest: CreateAttractionRequest[]) {
    const attractionsReferences: Promise<Reference | null>[] = [];
    createAttractionRequest.forEach(async request => {
      attractionsReferences.push(this.attractionsService.create(request));
    });
    const aR = await Promise.all(attractionsReferences)

    res.status(201).send(new SuccessResponseBuilder().okResponse({ attractions: aR }).build());
  }



  async getAttractionById(res: Response, identifier: string) {
    const attraction = await this.attractionsService.readById(identifier);
    if (attraction) {
      res.status(200).send(new SuccessResponseBuilder<GetAttractionResponse>().okResponse({ attraction: attraction }).build());
    } else {
      res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Attraction not found").build());
    }
  }

  async getAttractionReferenceById(res: Response, identifier: string) {
    const attractionReference = await this.attractionsService.readReferenceById(identifier);
    if (attractionReference) {
      res.status(200).send(new SuccessResponseBuilder<GetAttractionResponse>().okResponse({ attractionReference: attractionReference }).build());
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
