import debug from 'debug';
import { Organization } from '../../../generated/models/Organization.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { SearchOrganizationsRequest } from '../../../generated/models/SearchOrganizationsRequest.generated';


const log: debug.IDebugger = debug('app:organizations-repository');

export interface OrganizationsRepository {
	updateOrganizationActivationStatusById(identifier: string, activationStatus: Organization['activationStatus']): Promise<boolean>;

	updateOrganizationStatusById(identifier: string, status: Organization['status']): boolean | PromiseLike<boolean>;

	searchOrganizations(searchOrganizationsRequest: SearchOrganizationsRequest): Organization[] | PromiseLike<Organization[]>;
	
	searchDuplicates(organization: Organization): Promise<Organization[]>;

	addOrganization(createOrganization: CreateOrganizationRequest): Promise<string>;

	getOrganizations(limit:number, page:number) : Promise<Organization[]>;

	getOrganizationByIdentifier(organizationId: string) : Promise<Organization | null>;

	updateOrganizationById(organizationId: string, organizationFields: UpdateOrganizationRequest ): Promise<boolean>;

	removeOrganizationById(organizationId: string) :  Promise<boolean>;
}


