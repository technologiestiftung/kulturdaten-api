import debug from "debug";
import { Pagination } from "../../../common/parameters/Pagination";
import { CreateOrganizationRequest } from "../../../generated/models/CreateOrganizationRequest.generated";
import { Filter } from "../../../generated/models/Filter.generated";
import { Organization } from "../../../generated/models/Organization.generated";
import { Reference } from "../../../generated/models/Reference.generated";
import { UpdateOrganizationRequest } from "../../../generated/models/UpdateOrganizationRequest.generated";
import { AuthUser } from "../../../generated/models/AuthUser.generated";

const log: debug.IDebugger = debug("app:organizations-repository");

export interface OrganizationsRepository {
	getOrganizations(pagination?: Pagination, filter?: Filter): Promise<Organization[]>;

	getOrganizationsAsReferences(pagination?: Pagination, filter?: Filter): Promise<Reference[]>;

	searchOrganizations(filter?: Filter, pagination?: Pagination): Promise<Organization[]>;

	searchAllOrganizations(filter: Filter, projection?: object): Promise<Organization[]>;

	countOrganizations(filter?: Filter): Promise<number>;

	getOrganizationByIdentifier(organizationId: string): Promise<Organization | null>;

	getOrganizationReferenceByIdentifier(identifier: string): Promise<Reference | null>;

	addOrganization(createOrganization: CreateOrganizationRequest, creator?: AuthUser): Promise<Reference | null>;

	updateOrganizationById(organizationId: string, organizationFields: UpdateOrganizationRequest): Promise<boolean>;

	updateOrganizationActivationStatusById(
		identifier: string,
		activationStatus: Organization["activationStatus"],
	): Promise<boolean>;

	updateOrganizationStatusById(identifier: string, status: Organization["status"]): Promise<boolean>;

	removeOrganizationById(organizationId: string): Promise<boolean>;
}
