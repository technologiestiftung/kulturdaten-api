import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { AddExternalLinkRequest } from "../../../generated/models/AddExternalLinkRequest.generated";
import { AdminAttraction } from "../../../generated/models/AdminAttraction.generated";
import { Attraction } from "../../../generated/models/Attraction.generated";
import { CreateAttractionRequest } from "../../../generated/models/CreateAttractionRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { RemoveExternalLinkRequest } from "../../../generated/models/RemoveExternalLinkRequest.generated";
import { UpdateAttractionRequest } from "../../../generated/models/UpdateAttractionRequest.generated";
import { EventsRepository } from "../../events/repositories/EventsRepository";
import { AttractionsRepository } from "../repositories/AttractionsRepository";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { isSuperAdmin } from "../../auth/middleware/PermissionFlag";

@Service()
export class AttractionsService {
	constructor(
		@Inject("AttractionsRepository") public attractionsRepository: AttractionsRepository,
		@Inject("EventsRepository") public eventsRepository: EventsRepository,
	) {}

	async list(pagination?: Pagination): Promise<Attraction[]> {
		return this.attractionsRepository.getAttractions(pagination);
	}

	async listAsReferences(pagination?: Pagination): Promise<Reference[]> {
		return this.attractionsRepository.getAttractionsAsReferences(pagination);
	}

	async listForAdmins(pagination?: Pagination): Promise<AdminAttraction[]> {
		const attractions = await this.attractionsRepository.getAttractions(pagination);
		const attractionsWithEvents = await Promise.all(
			attractions.map((attraction) => this.createAdminAttraction(attraction)),
		);
		return attractionsWithEvents;
	}

	private async createAdminAttraction(attraction: Attraction): Promise<AdminAttraction> {
		const events = await this.eventsRepository.searchAllEvents({
			"attractions.referenceId": attraction.identifier,
		});
		const adminAttraction: AdminAttraction = {
			...attraction,
			events,
		};
		return adminAttraction;
	}

	async search(filter?: Filter, pagination?: Pagination): Promise<Attraction[]> {
		return this.attractionsRepository.searchAttractions(filter, pagination);
	}

	async countAttractions(searchFilter?: Filter): Promise<number> {
		return this.attractionsRepository.countAttractions(searchFilter);
	}

	async create(createAttractionRequest: CreateAttractionRequest, authUser?: AuthUser): Promise<Reference | null> {
		if (!authUser && !isSuperAdmin(authUser)) {
			delete createAttractionRequest["curator"];
		}
		if (authUser?.organizationIdentifier) {
			createAttractionRequest.curator = {
				referenceType: "type.Organization",
				referenceId: authUser.organizationIdentifier,
			};
		}
		return this.attractionsRepository.addAttraction(createAttractionRequest);
	}

	async readById(attractionId: any): Promise<Attraction | null> {
		return this.attractionsRepository.getAttractionByIdentifier(attractionId);
	}

	async readByIdForAdmins(attractionId: any): Promise<AdminAttraction | null> {
		const attraction = await this.attractionsRepository.getAttractionByIdentifier(attractionId);
		if (!attraction) {
			return null;
		}
		return this.createAdminAttraction(attraction);
	}

	async readReferenceById(attractionId: any): Promise<Reference | null> {
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
		return this.attractionsRepository.updateAttractionStatusById(identifier, "attraction.archived");
	}

	async unarchive(identifier: string): Promise<boolean> {
		return this.attractionsRepository.updateAttractionStatusById(identifier, "attraction.unpublished");
	}

	async publish(identifier: string): Promise<boolean> {
		return this.attractionsRepository.updateAttractionStatusById(identifier, "attraction.published");
	}

	async unpublish(identifier: string): Promise<boolean> {
		return this.attractionsRepository.updateAttractionStatusById(identifier, "attraction.unpublished");
	}
}
