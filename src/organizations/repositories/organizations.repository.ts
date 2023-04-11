import debug from 'debug';
import { CreateOrganization } from '../../generatedModels/CreateOrganization.generated';
import { Organization } from '../../generatedModels/Organization.generated';
import { PatchOrganization } from '../../generatedModels/PatchOrganization.generated';


const log: debug.IDebugger = debug('app:organizations-repository');

export interface OrganizationsRepository {

	addOrganization(createOrganization: CreateOrganization): Promise<string>;

	getOrganizations(limit:number, page:number) : Promise<Organization[] | null>;

	getOrganizationByIdentifier(organizationId: string) : Promise<Organization | null>;

	updateOrganizationById(organizationId: string, organizationFields: PatchOrganization ): Promise<boolean>;

	removeOrganizationById(organizationId: string) :  Promise<boolean>;
}


