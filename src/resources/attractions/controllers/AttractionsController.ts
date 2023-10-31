import { Response } from "express";
import { Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { CreateAttractionResponse } from "../../../generated/models/CreateAttractionResponse.generated";
import { GetAdminAttractionResponse } from "../../../generated/models/GetAdminAttractionResponse.generated";
import { GetAdminAttractionsResponse } from "../../../generated/models/GetAdminAttractionsResponse.generated";
import { GetAttractionResponse } from "../../../generated/models/GetAttractionResponse.generated";
import { GetAttractionsResponse } from "../../../generated/models/GetAttractionsResponse.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { SearchAttractionsRequest } from "../../../generated/models/SearchAttractionsRequest.generated";
import { SearchAttractionsResponse } from "../../../generated/models/SearchAttractionsResponse.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { AttractionsService } from "../services/AttractionsService";
import { ResourcePermissionController } from "../../auth/controllers/ResourcePermissionController";
import { Filter } from "../../../generated/models/Filter.generated";

@Service()
export class AttractionsController implements ResourcePermissionController {
	constructor(public attractionsService: AttractionsService) {}

	async listAttractions(res: Response, pagination: Pagination) {
		const attractions = await this.attractionsService.list(pagination);
		const totalCount = await this.attractionsService.countAttractions();
		res.status(200).send(
			new SuccessResponseBuilder<GetAttractionsResponse>()
				.okResponse({
					page: pagination.page,
					pageSize: pagination.pageSize,
					totalCount: totalCount,
					attractions: attractions,
				})
				.build(),
		);
	}

	async listAttractionsAsReference(res: Response, pagination: Pagination) {
		const attractionsReferences = await this.attractionsService.listAsReferences(pagination);
		const totalCount = await this.attractionsService.countAttractions();

		res.status(200).send(
			new SuccessResponseBuilder<GetAttractionsResponse>()
				.okResponse({
					page: pagination.page,
					pageSize: pagination.pageSize,
					totalCount: totalCount,
					attractionsReferences: attractionsReferences,
				})
				.build(),
		);
	}

	async listAttractionsForAdmins(res: Response, pagination: Pagination) {
		const adminAttractions = await this.attractionsService.listForAdmins(pagination);
		const totalCount = await this.attractionsService.countAttractions();
		res.status(200).send(
			new SuccessResponseBuilder<GetAdminAttractionsResponse>()
				.okResponse({
					page: pagination.page,
					pageSize: pagination.pageSize,
					totalCount,
					attractions: adminAttractions,
				})
				.build(),
		);
	}

	public async searchAttractions(
		res: Response,
		searchAttractionsRequest: SearchAttractionsRequest,
		pagination: Pagination,
	) {
		const filter = searchAttractionsRequest.searchFilter;

		const attractions = await this.attractionsService.search(filter, pagination);
		const totalCount = await this.attractionsService.countAttractions(filter);

		if (attractions) {
			res.status(200).send(
				new SuccessResponseBuilder<SearchAttractionsResponse>()
					.okResponse({
						page: pagination.page,
						pageSize: pagination.pageSize,
						totalCount: totalCount,
						attractions: attractions,
					})
					.build(),
			);
		} else {
			res
				.status(404)
				.send(new ErrorResponseBuilder().notFoundResponse("No attractions matched the search criteria").build());
		}
	}

	async isExist(permissionFilter: Filter): Promise<boolean> {
		const totalCount = await this.attractionsService.countAttractions(permissionFilter);
		return totalCount > 0;
	}

	async createAttraction(res: Response, createAttractionRequest: CreateAttractionRequest) {
		const attractionReference = await this.attractionsService.create(createAttractionRequest);
		if (attractionReference) {
			res
				.status(201)
				.send(
					new SuccessResponseBuilder<CreateAttractionResponse>()
						.okResponse({ attractionReference: attractionReference })
						.build(),
				);
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("An attraction cannot be created with the data.").build());
		}
	}

	async createAttractions(res: Response, createAttractionRequest: CreateAttractionRequest[]) {
		const attractionsReferences: Promise<Reference | null>[] = [];
		createAttractionRequest.forEach(async (request) => {
			attractionsReferences.push(this.attractionsService.create(request));
		});
		const aR = await Promise.all(attractionsReferences);

		res.status(201).send(new SuccessResponseBuilder().okResponse({ attractions: aR }).build());
	}

	async getAttractionById(res: Response, identifier: string) {
		const attraction = await this.attractionsService.readById(identifier);
		if (attraction) {
			res
				.status(200)
				.send(new SuccessResponseBuilder<GetAttractionResponse>().okResponse({ attraction: attraction }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Attraction not found").build());
		}
	}

	async getAttractionReferenceById(res: Response, identifier: string) {
		const attractionReference = await this.attractionsService.readReferenceById(identifier);
		if (attractionReference) {
			res
				.status(200)
				.send(
					new SuccessResponseBuilder<GetAttractionResponse>()
						.okResponse({ attractionReference: attractionReference })
						.build(),
				);
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Attraction not found").build());
		}
	}

	async getAttractionByIdForAdmins(res: Response, identifier: string) {
		const adminAttraction = await this.attractionsService.readByIdForAdmins(identifier);
		if (adminAttraction) {
			res.status(200).send(
				new SuccessResponseBuilder<GetAdminAttractionResponse>()
					.okResponse({
						attraction: adminAttraction,
					})
					.build(),
			);
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Admin attraction not found").build());
		}
	}

	public async updateAttraction(
		res: Response,
		identifier: string,
		updateAttractionRequest: UpdateAttractionRequest,
	): Promise<void> {
		const isUpdated = await this.attractionsService.update(identifier, updateAttractionRequest);
		if (isUpdated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the attraction").build());
		}
	}

	public async addExternalLink(
		res: Response,
		identifier: string,
		addExternalLinkRequest: AddExternalLinkRequest,
	): Promise<void> {
		const isAdded = await this.attractionsService.addExternalLink(identifier, addExternalLinkRequest);
		if (isAdded) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to add external link to the attraction").build());
		}
	}

	public async removeExternalLink(
		res: Response,
		identifier: string,
		removeExternalLinkRequest: RemoveExternalLinkRequest,
	): Promise<void> {
		const isRemoved = await this.attractionsService.removeExternalLink(identifier, removeExternalLinkRequest);
		if (isRemoved) {
			res.status(204).send();
		} else {
			res
				.status(400)
				.send(
					new ErrorResponseBuilder().badRequestResponse("Failed to remove external link from the attraction").build(),
				);
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
