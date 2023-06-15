import express from 'express';
import { OrganizationsService } from '../services/organizations.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../../generated/models/SearchOrganizationsRequest.generated';
import { ErrorResponseBuilder, SuccessResponseBuilder } from '../../../common/responses/response.builders';

const log: debug.IDebugger = debug('app:organizations-controller');

@Service()
export class OrganizationsController {


	constructor(
		public organizationsService: OrganizationsService) { }

	async listOrganizations(res: express.Response) {
		const organizations = await this.organizationsService.list(100, 0);
		if (organizations) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ organizations: organizations }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Organizations not found").build());
		}
	}

	async getOrganizationById(res: express.Response, organizationId: string) {
		const organization = await this.organizationsService.readById(organizationId);
		if (organization) {
			res.status(200).send(new SuccessResponseBuilder().okResponse({ organization: organization }).build());
		} else {
			res.status(404).send(new ErrorResponseBuilder().notFoundResponse("Organization not found").build());
		}
	}

	async createOrganization(res: express.Response, createOrganization: CreateOrganizationRequest) {
		const organizationId = await this.organizationsService.create(createOrganization);
		if (organizationId) {
			res.status(201).send(new SuccessResponseBuilder().okResponse({ identifier: organizationId } ).build());
		} else {
			res.status(400).send(new ErrorResponseBuilder().badRequestResponse("An organization cannot be created with the data.").build());
		}
	}

	unarchiveOrganization(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	archiveOrganization(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	retireOrganization(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	deactivateOrganization(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	activateOrganization(res: express.Response<any, Record<string, any>>, identifier: string) {
		throw new Error('Method not implemented.');
	}
	updateOrganization(res: express.Response<any, Record<string, any>>, identifier: string, updateOrganizationRequest: UpdateOrganizationRequest) {
		throw new Error('Method not implemented.');
	}
	searchOrganizations(res: express.Response<any, Record<string, any>>, searchOrganizationsRequest: SearchOrganizationsRequest) {
		throw new Error('Method not implemented.');
	}

}
