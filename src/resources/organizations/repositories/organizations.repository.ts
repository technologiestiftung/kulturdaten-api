import debug from 'debug';
import { Organization } from '../../../generated/models/Organization.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';


const log: debug.IDebugger = debug('app:organizations-repository');

export interface OrganizationsRepository {
	searchDuplicates(organization: Organization): Promise<Organization[]>;

	addOrganization(createOrganization: CreateOrganizationRequest): Promise<string>;

	getOrganizations(limit:number, page:number) : Promise<Organization[] | null>;

	getOrganizationByIdentifier(organizationId: string) : Promise<Organization | null>;

	updateOrganizationById(organizationId: string, organizationFields: UpdateOrganizationRequest ): Promise<boolean>;

	removeOrganizationById(organizationId: string) :  Promise<boolean>;
}


