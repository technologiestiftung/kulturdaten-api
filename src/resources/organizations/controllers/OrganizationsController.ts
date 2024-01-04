import debug from "debug";
import express from "express";
import { Inject, Service } from "typedi";
import { Pagination } from "../../../common/parameters/Pagination";
import { ErrorResponseBuilder, SuccessResponseBuilder } from "../../../common/responses/ResponseBuilder";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { SearchOrganizationsRequest } from "../../../generated/models/SearchOrganizationsRequest.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { OrganizationsService } from "../services/OrganizationsService";
import { GetOrganizationsResponse } from "../../../generated/models/GetOrganizationsResponse.generated";
import { GetOrganizationResponse } from "../../../generated/models/GetOrganizationResponse.generated";
import { CreateOrganizationResponse } from "../../../generated/models/CreateOrganizationResponse.generated";
import { SearchOrganizationsResponse } from "../../../generated/models/SearchOrganizationsResponse.generated";
import { ResourcePermissionController } from "../../auth/controllers/ResourcePermissionController";
import { Filter } from "../../../generated/models/Filter.generated";
import { CreateMembershipRequest } from "../../../generated/models/CreateMembershipRequest.generated";
import { UsersService } from "../../users/services/UsersService";
import { CreateMembershipResponse } from "../../../generated/models/CreateMembershipResponse.generated";
import { generateOrganizationMembership } from "../../../utils/MembershipUtil";
import { GetOrganizationMembershipsResponse } from "../../../generated/models/GetOrganizationMembershipsResponse.generated";
import { UpdateOrganizationMembershipRequest } from "../../../generated/models/UpdateOrganizationMembershipRequest.generated";
import { GetOrganizationMembershipResponse } from "../../../generated/models/GetOrganizationMembershipResponse.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";
import { OrganizationParams } from "../../../common/parameters/Params";
import { Organization } from "../../../generated/models/Organization.generated";
import { getEditableByFilter } from "../../../utils/MetadataUtil";
import { FilterFactory } from "../../../common/filter/FilterFactory";

const log: debug.IDebugger = debug("app:organizations-controller");

@Service()
export class OrganizationsController implements ResourcePermissionController {
	constructor(
		public organizationsService: OrganizationsService,
		public userService: UsersService,
		@Inject("FilterFactory") public filterFactory: FilterFactory,
	) {}

	async getOrganizations(res: express.Response, pagination: Pagination, params?: OrganizationParams) {
		const { customizedPagination, data, related, error } = await this.organizationsService.getOrganizations(
			pagination,
			params,
		);

		if (error) {
			res.status(error.code ? error.code : 500).send(new ErrorResponseBuilder(error).build());
		} else {
			res
				.status(200)
				.send(
					new SuccessResponseBuilder<GetOrganizationsResponse>()
						.okResponse({ ...customizedPagination, ...data }, { related })
						.build(),
				);
		}
	}

	async listOrganizations(res: express.Response, pagination: Pagination, params?: OrganizationParams) {
		const filter: Filter = this.getOrganizationsFilter(params);
		const totalCount = await this.organizationsService.countOrganizations(filter);

		const sendOrganizationsResponse = (data: {
			organizations?: Organization[];
			organizationsReferences?: Reference[];
		}) => {
			res.status(200).send(
				new SuccessResponseBuilder<GetOrganizationsResponse>()
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
			const organizationsReferences = await this.organizationsService.listAsReferences(pagination, filter);
			sendOrganizationsResponse({ organizationsReferences });
		} else {
			const organizations = await this.organizationsService.list(pagination, filter);
			sendOrganizationsResponse({ organizations });
		}
	}

	async searchOrganizations(
		res: express.Response,
		searchOrganizationsRequest: SearchOrganizationsRequest,
		pagination: Pagination,
	) {
		const filter = searchOrganizationsRequest.searchFilter;

		const organizations = await this.organizationsService.search(filter, pagination);
		const totalCount = await this.organizationsService.countOrganizations(filter);

		if (organizations) {
			res.status(200).send(
				new SuccessResponseBuilder<SearchOrganizationsResponse>()
					.okResponse({
						page: pagination.page,
						pageSize: pagination.pageSize,
						totalCount: totalCount,
						organizations: organizations,
					})
					.build(),
			);
		} else {
			res
				.status(404)
				.send(new ErrorResponseBuilder().notFoundResponse("No organizations matched the search criteria").build());
		}
	}

	async isExist(permissionFilter: Filter): Promise<boolean> {
		const totalCount = await this.organizationsService.countOrganizations(permissionFilter);
		return totalCount > 0;
	}

	async getOrganizationById(res: express.Response, organizationId: string) {
		const organization = await this.organizationsService.readById(organizationId);
		if (organization) {
			res
				.status(200)
				.send(new SuccessResponseBuilder<GetOrganizationResponse>().okResponse({ organization: organization }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Organization not found").build());
		}
	}

	async getOrganizationReferenceById(res: express.Response, identifier: string) {
		const organizationReference = await this.organizationsService.readReferenceById(identifier);
		if (organizationReference) {
			res
				.status(200)
				.send(
					new SuccessResponseBuilder<GetOrganizationResponse>()
						.okResponse({ organizationReference: organizationReference })
						.build(),
				);
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Organization not found").build());
		}
	}

	async createOrganization(res: express.Response, createOrganization: CreateOrganizationRequest, authUser?: AuthUser) {
		const organizationReference = await this.organizationsService.create(createOrganization, authUser);
		if (organizationReference) {
			res
				.status(201)
				.send(
					new SuccessResponseBuilder<CreateOrganizationResponse>()
						.okResponse({ organizationReference: organizationReference })
						.build(),
				);
		} else {
			res
				.status(400)
				.send(
					new ErrorResponseBuilder().badRequestResponse("An organization cannot be created with the data.").build(),
				);
		}
	}

	async createOrganizations(
		res: express.Response,
		createOrganizationsRequest: CreateOrganizationRequest[],
		authUser?: AuthUser,
	) {
		const organizationsReferences: Promise<Reference | null>[] = [];
		createOrganizationsRequest.forEach(async (request) => {
			organizationsReferences.push(this.organizationsService.create(request, authUser));
		});
		const oR = await Promise.all(organizationsReferences);

		res.status(201).send(new SuccessResponseBuilder().okResponse({ organizations: oR }).build());
	}

	async unarchiveOrganization(res: express.Response, identifier: string) {
		const isUnarchived = await this.organizationsService.unarchive(identifier);
		if (isUnarchived) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to unarchive the organization").build());
		}
	}

	async publishOrganization(res: express.Response, identifier: string) {
		const isPublished = await this.organizationsService.publish(identifier);
		if (isPublished) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to publish the organization").build());
		}
	}

	async unpublishOrganization(res: express.Response, identifier: string) {
		const isUnpublished = await this.organizationsService.unpublish(identifier);
		if (isUnpublished) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to unpublish the organization").build());
		}
	}

	async archiveOrganization(res: express.Response, identifier: string) {
		const isArchived = await this.organizationsService.archive(identifier);
		if (isArchived) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to archive the organization").build());
		}
	}

	async retireOrganization(res: express.Response, identifier: string) {
		const isRetired = await this.organizationsService.retire(identifier);
		if (isRetired) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to retire the organization").build());
		}
	}

	async deactivateOrganization(res: express.Response, identifier: string) {
		const isDeactivated = await this.organizationsService.deactivate(identifier);
		if (isDeactivated) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to deactivate the organization").build());
		}
	}

	async activateOrganization(res: express.Response, identifier: string) {
		const isActivated = await this.organizationsService.activate(identifier);
		if (isActivated) {
			res.status(200).send();
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("Failed to activate the organization").build());
		}
	}

	async updateOrganization(
		res: express.Response,
		identifier: string,
		updateOrganizationRequest: UpdateOrganizationRequest,
	) {
		const isUpdated = await this.organizationsService.update(identifier, updateOrganizationRequest);
		if (isUpdated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the organization").build());
		}
	}

	async listMemberships(res: express.Response, organizationIdentifier: string) {
		const memberships = await this.userService.listMembershipsFor(organizationIdentifier);
		res.status(200).send(
			new SuccessResponseBuilder<GetOrganizationMembershipsResponse>()
				.okResponse({
					organizationIdentifier: organizationIdentifier,
					memberships: memberships,
				})
				.build(),
		);
	}

	async getMembership(res: express.Response, organizationIdentifier: string, userIdentifier: string) {
		const membership = await this.userService.getMembershipFor(organizationIdentifier, userIdentifier);
		if (membership) {
			res.status(200).send(
				new SuccessResponseBuilder<GetOrganizationMembershipResponse>()
					.okResponse({
						organizationIdentifier: organizationIdentifier,
						membership: membership,
					})
					.build(),
			);
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Membership not found").build());
		}
	}

	async createMembership(
		res: express.Response,
		organizationIdentifier: string,
		createMembership: CreateMembershipRequest,
	) {
		const user = await this.userService.getUserByEmail(createMembership.email);
		if (!user) {
			res
				.status(404)
				.send(
					new ErrorResponseBuilder()
						.notFoundResponse(
							"There is no user with this email address yet. Please create the user before inviting them as a member.",
						)
						.build(),
				);
			return;
		}
		if (user.memberships.some((membership) => membership.organizationIdentifier === organizationIdentifier)) {
			const error = new ErrorResponseBuilder()
				.badRequestResponse(
					"A membership for the specified organization already exists. Therefore, no new membership was created.",
				)
				.build();
			console.log(JSON.stringify(error));
			res.status(400).send(error);
			return;
		}

		const isCreated = await this.userService.createMembership(organizationIdentifier, createMembership);
		if (isCreated) {
			res
				.status(201)
				.send(
					new SuccessResponseBuilder<CreateMembershipResponse>()
						.okResponse({ membership: generateOrganizationMembership(user, createMembership.role) })
						.build(),
				);
		} else {
			res
				.status(400)
				.send(new ErrorResponseBuilder().badRequestResponse("An membership cannot be created with the data.").build());
		}
	}

	async deleteMembership(res: express.Response, organizationIdentifier: string, userIdentifier: string) {
		const isDeleted = await this.userService.deleteMembership(userIdentifier, organizationIdentifier);
		if (isDeleted) {
			res.status(204).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to delete the membership").build());
		}
	}

	async updateMembership(
		res: express.Response,
		organizationIdentifier: string,
		userIdentifier: string,
		updateOrganizationMembershipRequest: UpdateOrganizationMembershipRequest,
	) {
		const isUpdated = await this.userService.updateMembership(
			userIdentifier,
			organizationIdentifier,
			updateOrganizationMembershipRequest,
		);
		if (isUpdated) {
			res.status(204).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the membership").build());
		}
	}

	private getOrganizationsFilter(params?: OrganizationParams): Filter {
		const filter: Filter = {
			...getEditableByFilter(params?.editableBy),
		};

		return filter;
	}
}
