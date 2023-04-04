import { CreateOrganization } from '../dtos/create.organization.dto.generated';


import debug from 'debug';
import { PatchOrganization } from '../dtos/patch.organization.dto.generated';
import { Organization } from '../models/organization.generated';

const log: debug.IDebugger = debug('app:organizations-repository');

export interface OrganizationsRepository {

	addOrganization(createOrganization: CreateOrganization): Promise<string>;

	getOrganizations(limit:number, page:number) : Promise<Organization[] | null>;

	getOrganizationByIdentifier(organizationId: string) : Promise<Organization | null>;

	updateOrganizationById(organizationId: string, organizationFields: PatchOrganization ): Promise<boolean>;

	removeOrganizationById(organizationId: string) :  Promise<boolean>;
}


