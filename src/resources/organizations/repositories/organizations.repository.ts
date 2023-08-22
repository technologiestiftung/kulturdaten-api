import debug from 'debug';
import { Organization } from '../../../generated/models/Organization.generated';
import { UpdateOrganizationRequest } from '../../../generated/models/UpdateOrganizationRequest.generated';
import { CreateOrganizationRequest } from '../../../generated/models/CreateOrganizationRequest.generated';
import { Filter } from '../../../generated/models/Filter.generated';
import { Reference } from '../../../generated/models/Reference.generated';


const log: debug.IDebugger = debug('app:organizations-repository');

export interface OrganizationsRepository {

	getOrganizations(page:number, pageSize:number) : Promise<Organization[]>;

	getOrganizationsAsReferences(page:number, pageSize:number) : Promise<Reference[] | null>;

	searchOrganizations(filter: Filter, page:number, pageSize:number): Promise<Organization[]> ;
	
	countOrganizations(filter?: Filter): Promise<number>;


	getOrganizationByIdentifier(organizationId: string) : Promise<Organization | null>;

	getOrganizationReferenceByIdentifier(identifier: string): Promise<Reference | null>;


	addOrganization(createOrganization: CreateOrganizationRequest): Promise<Reference | null>;


	updateOrganizationById(organizationId: string, organizationFields: UpdateOrganizationRequest ): Promise<boolean>;

	
	updateOrganizationActivationStatusById(identifier: string, activationStatus: Organization['activationStatus']): Promise<boolean>;

	updateOrganizationStatusById(identifier: string, status: Organization['status']): Promise<boolean>;


	removeOrganizationById(organizationId: string) :  Promise<boolean>;
}


