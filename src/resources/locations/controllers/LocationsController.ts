import debug from "debug";
import express from "express";
import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { Location } from "../../../generated/models/Location.generated";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../../../common/responses/ResponseBuilder";
import { ClaimLocationRequest } from "../../../generated/models/ClaimLocationRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { SearchLocationsRequest } from "../../../generated/models/SearchLocationsRequest.generated";
import { SearchLocationsResponse } from "../../../generated/models/SearchLocationsResponse.generated";
import { SetLocationManagerRequest } from "../../../generated/models/SetLocationManagerRequest.generated";
import { UpdateLocationRequest } from "../../../generated/models/UpdateLocationRequest.generated";
import { LocationsService } from "../services/LocationsService";
import { Filter } from "../../../generated/models/Filter.generated";
import { ResourcePermissionController } from "../../auth/controllers/ResourcePermissionController";
import { GetLocationResponse } from "../../../generated/models/GetLocationResponse.generated";
import { CreateLocationResponse } from "../../../generated/models/CreateLocationResponse.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { CreateLocationRequest } from "../../../generated/models/CreateLocationRequest.generated";
import { LocationParams } from "../../../common/parameters/Params";
import { getEditableByFilter } from "../../../utils/MetadataUtil";
import { FilterFactory } from "../../../common/filter/FilterFactory";
import { GetLocationsResponse } from "../../../generated/models/GetLocationsResponse.generated";

const log: debug.IDebugger = debug("app:locations-controller");

@Service()
export class LocationsController implements ResourcePermissionController {
	constructor(
		public locationsService: LocationsService,
		@Inject("FilterFactory") public filterFactory: FilterFactory,
	) {}

	async listLocations(res: express.Response, pagination: Pagination, params?: LocationParams) {
		let filter: Filter = this.getLocationsFilter(params);
		const anyAccessibilitiesFilter = this.filterFactory.createAnyMatchFilter(
			"accessibility",
			params?.anyAccessibilities,
		);
		const allAccessibilitiesFilter = this.filterFactory.createAllMatchFilter(
			"accessibility",
			params?.allAccessibilities,
		);
		filter = this.filterFactory.combineWithAnd([filter, anyAccessibilitiesFilter, allAccessibilitiesFilter]);
		const totalCount = await this.locationsService.countLocations(filter);

		const sendLocationsResponse = (data: { locations?: Location[]; locationsReferences?: Reference[] }) => {
			res.status(200).send(
				new SuccessResponseBuilder<GetLocationsResponse>()
					.okResponse({
						page: pagination.page,
						pageSize: pagination.pageSize,
						totalCount: totalCount,
						...data,
					})
					.build(),
			);
		};

		if (params?.asReference) {
			const locationsReferences = await this.locationsService.listAsReferences(pagination, filter);
			sendLocationsResponse({ locationsReferences });
		} else {
			const locations = await this.locationsService.list(pagination, filter);
			sendLocationsResponse({ locations });
		}
	}

	async searchLocations(res: express.Response, searchLocationsRequest: SearchLocationsRequest, pagination: Pagination) {
		const filter = searchLocationsRequest.searchFilter ? searchLocationsRequest.searchFilter : {};

		const locations = await this.locationsService.search(filter, pagination);
		const totalCount = await this.locationsService.countLocations(filter);

		if (locations) {
			res.status(200).send(
				new SuccessResponseBuilder<SearchLocationsResponse>()
					.okResponse({
						page: pagination.page,
						pageSize: pagination.pageSize,
						totalCount: totalCount,
						locations: locations,
					})
					.build(),
			);
		} else {
			res
				.status(404)
				.send(new ErrorResponseBuilder().notFoundResponse("No locations matched the search criteria").build());
		}
	}

	async isExist(permissionFilter: Filter): Promise<boolean> {
		const totalCount = await this.locationsService.countLocations(permissionFilter);
		return totalCount > 0;
	}

	async getLocationById(res: express.Response, locationId: string) {
		const location = await this.locationsService.readById(locationId);
		if (location) {
			res
				.status(200)
				.send(new SuccessResponseBuilder<GetLocationResponse>().okResponse({ location: location }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Location not found").build());
		}
	}

	async getLocationReferenceById(res: express.Response, locationId: string) {
		const location = await this.locationsService.readReferenceById(locationId);
		if (location) {
			res
				.status(200)
				.send(new SuccessResponseBuilder<GetLocationResponse>().okResponse({ locationReference: location }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Location not found").build());
		}
	}

	async createLocation(res: express.Response, createLocationRequest: CreateLocationRequest, authUser?: AuthUser) {
		const locationReference = await this.locationsService.create(createLocationRequest, authUser);
		if (locationReference) {
			res
				.status(201)
				.send(
					new SuccessResponseBuilder<CreateLocationResponse>()
						.okResponse({ locationReference: locationReference })
						.build(),
				);
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("An location cannot be created with the data.").build());
		}
	}

	async createLocations(res: express.Response, createLocationsRequest: CreateLocationRequest[], authUser?: AuthUser) {
		const locationsReferences: Promise<Reference | null>[] = [];
		createLocationsRequest.forEach(async (request) => {
			locationsReferences.push(this.locationsService.create(request, authUser));
		});
		const lR = await Promise.all(locationsReferences);

		res.status(201).send(new SuccessResponseBuilder().okResponse({ locations: lR }).build());
	}

	claimLocation(res: express.Response, identifier: string, claimLocationRequest: ClaimLocationRequest) {
		//TODO: check claim
		this.setLocationManager(res, identifier, claimLocationRequest);
	}

	async unarchiveLocation(res: express.Response, identifier: string) {
		const isUnarchived = await this.locationsService.unarchive(identifier);
		if (isUnarchived) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unarchive the location").build());
		}
	}

	public async publishLocation(res: express.Response, identifier: string): Promise<void> {
		const isPublished = await this.locationsService.publishLocation(identifier);
		if (isPublished) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to publish the location").build());
		}
	}

	public async unpublishLocation(res: express.Response, identifier: string): Promise<void> {
		const isUnpublished = await this.locationsService.unpublishLocation(identifier);
		if (isUnpublished) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unpublish the location").build());
		}
	}

	async closeLocation(res: express.Response, identifier: string) {
		const isClosed = await this.locationsService.closeLocation(identifier);
		if (isClosed) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to close the location").build());
		}
	}

	async openLocation(res: express.Response, identifier: string) {
		const isOpened = await this.locationsService.openLocation(identifier);
		if (isOpened) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to open the location").build());
		}
	}

	async permanentlyCloseLocation(res: express.Response, identifier: string) {
		const isPermanentlyClosed = await this.locationsService.permanentlyCloseLocation(identifier);
		if (isPermanentlyClosed) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to permanently close the location").build());
		}
	}

	async deleteLocationManager(res: express.Response, identifier: string) {
		const isDeleted = await this.locationsService.deleteLocationManager(identifier);
		if (isDeleted) {
			res.status(204).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to delete the manager from the location").build());
		}
	}
	async setLocationManager(
		res: express.Response,
		identifier: string,
		setLocationManagerRequest: SetLocationManagerRequest,
	) {
		const isSet = await this.locationsService.setLocationManager(identifier, setLocationManagerRequest);
		if (isSet) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to set the manager for the location").build());
		}
	}
	async updateLocation(res: express.Response, identifier: string, updateLocationRequest: UpdateLocationRequest) {
		const isUpdated = await this.locationsService.update(identifier, updateLocationRequest);
		if (isUpdated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the location").build());
		}
	}

	async archiveLocation(res: express.Response, identifier: string) {
		const isArchived = await this.locationsService.archive(identifier);
		if (isArchived) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to archive the location").build());
		}
	}

	private getManagedByFilter(managedBy?: string) {
		return managedBy ? { "manager.referenceId": managedBy } : undefined;
	}

	private getLocationsFilter(params?: LocationParams): Filter {
		const filter: Filter = {
			...this.getManagedByFilter(params?.managedBy),
			...getEditableByFilter(params?.editableBy),
		};

		return filter;
	}
}
