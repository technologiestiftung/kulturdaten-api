import express from 'express';
import { OrganizationsService } from '../services/organizations.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../../generated/models/SearchOrganizationsRequest.generated';
import { ErrorResponseBuilder, SuccessResponseBuilder } from '../../../common/responses/response.builders';
import { Reference } from '../../../generated/models/Reference.generated';

const log: debug.IDebugger = debug('app:organizations-controller');

@Service()
export class OrganizationsController {



	constructor(public organizationsService: OrganizationsService) {}

	async listOrganizations(res: express.Response) {
		const organizations = await this.organizationsService.list(100, 0);
		res.status(200).send(new SuccessResponseBuilder().okResponse({ organizations: organizations }).build());
	}

	async listOrganizationsAsReference(res: express.Response) {
		const organizationsReferences = await this.organizationsService.listAsReferences(100, 0);
		res.status(200).send(new SuccessResponseBuilder().okResponse({ organizationsReferences: organizationsReferences }).build());
	  }

	async getOrganizationById(res: express.Response, organizationId: string) {
		const organization = await this.organizationsService.readById(organizationId);
		if (organization) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ organization: organization }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Organization not found").build());
		}
	}

	async getOrganizationReferenceById(res: express.Response, identifier: string) {
		const organizationReference = await this.organizationsService.readReferenceById(identifier);
		if(organizationReference) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ organizationReference: organizationReference }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Organization not found").build());
		}
	  }

	async createOrganization(res: express.Response, createOrganization: CreateOrganizationRequest) {
		const organizationReference = await this.organizationsService.create(createOrganization);
		if (organizationReference) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ organizationReference: organizationReference }).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An organization cannot be created with the data.").build());
		}
	}

	async createOrganizations(res: express.Response, createOrganizationsRequest: CreateOrganizationRequest[]) {
		const organizationsReferences :  Promise<Reference | null> [] = [];
		createOrganizationsRequest.forEach(async request => {
			organizationsReferences.push(this.organizationsService.create(request));
		});
		const oR = await Promise.all(organizationsReferences)
	
		res.status(201).send(new SuccessResponseBuilder().okResponse({ organizations: oR }).build());
	  }



	async unarchiveOrganization(res: express.Response, identifier: string) {
		const isUnarchived = await this.organizationsService.unarchive(identifier);
		if (isUnarchived) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to unarchive the organization").build());
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
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to deactivate the organization").build());
		}
	}

	async activateOrganization(res: express.Response, identifier: string) {
		const isActivated = await this.organizationsService.activate(identifier);
		if (isActivated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to activate the organization").build());
		}
	}

	async updateOrganization(res: express.Response, identifier: string, updateOrganizationRequest: UpdateOrganizationRequest) {
		const isUpdated = await this.organizationsService.update(identifier, updateOrganizationRequest);
		if (isUpdated) {
			res.status(200).send();
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("Failed to update the organization").build());
		}
	}

	async searchOrganizations(res: express.Response, searchOrganizationsRequest: SearchOrganizationsRequest) {
		const organizations = await this.organizationsService.search(searchOrganizationsRequest);
		if (organizations) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ organizations: organizations }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("No organizations matched the search criteria").build());
		}
	}
}
