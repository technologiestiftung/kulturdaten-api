import { Filter } from "../../../generated/models/Filter.generated";

export class PermissionFilter implements Filter {
	[k: string]: unknown;

	constructor() {}

	static buildLocationPermissionFilter(organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.manager = organizationID;
		return filter;
	}

	static buildAttractionPermissionFilter(organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.curator = organizationID;
		return filter;
	}

	static buildOrganizationPermissionFilter(organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.identifier = organizationID;
		return filter;
	}

	static buildEventPermissionFilter(organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.organizer = organizationID;
		return filter;
	}
}
