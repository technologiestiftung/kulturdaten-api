import debug from 'debug';
import { CreateOrganization } from '../../generated/models/CreateOrganization.generated';
import { Organization } from '../../generated/models/Organization.generated';
import { PatchOrganization } from '../../generated/models/PatchOrganization.generated';


const log: debug.IDebugger = debug('app:organizations-repository');

export interface OrganizationsRepository {

	addOrganization(createOrganization: CreateOrganization): Promise<string>;

	getOrganizations(limit:number, page:number) : Promise<Organization[] | null>;

	getOrganizationByIdentifier(organizationId: string) : Promise<Organization | null>;

	updateOrganizationById(organizationId: string, organizationFields: PatchOrganization ): Promise<boolean>;

	removeOrganizationById(organizationId: string) :  Promise<boolean>;
}


