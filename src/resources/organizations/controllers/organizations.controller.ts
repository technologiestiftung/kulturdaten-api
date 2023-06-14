import express from 'express';
import { OrganizationsService } from '../services/organizations.service';
import debug from 'debug';
import { Service } from 'typedi';
import { CreateOrganization } from '../../../generated/models/CreateOrganization.generated';
import { PatchOrganization } from '../../../generated/models/PatchOrganization.generated';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../../generated/models/SearchOrganizationsRequest.generated';

const log: debug.IDebugger = debug('app:organizations-controller');

@Service()
export class OrganizationsController {
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

	constructor(
		public organizationsService: OrganizationsService) { }

	async listOrganizations(res: express.Response) {
		const organizations = await this.organizationsService.list(100, 0);

		res = res.status(200).send({ "organizations": organizations });
	}

	async getOrganizationById(res: express.Response, organizationId: string) {
		
		const organization = await this.organizationsService.readById(organizationId);
		if (organization){
			res.status(200).send({ "organization": organization });
		} 
		else {
			res.status(404).send({error: {msg: 'Organization not found'}});
		} 
	}

	async createOrganization(res: express.Response, createOrganization: CreateOrganizationRequest) {
		const organizationId = await this.organizationsService.create(createOrganization);
		res.status(201).send({ identifier: organizationId });
	}

	async patch(res: express.Response, organizationId: string, patchOrganization: PatchOrganization) {
		if(await this.organizationsService.patchById(organizationId, patchOrganization)){
			res.status(204).send();
		} 
		else {
			res.status(404).send({error: {msg: 'Organization not found'}});
		}
	}


	async removeOrganization(res: express.Response, organizationId: string) {
		if(await this.organizationsService.deleteById(organizationId))
		{
			res.status(204).send();
		}
		else {
			res.status(404).send({error: {msg: 'Organization not found'}});
		} 
	}

}
