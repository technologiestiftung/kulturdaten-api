import { Filter } from "../../../generated/models/Filter.generated";
import { Reference } from "../../../generated/models/Reference.generated";

export class PermissionFilter implements Filter {
	[k: string]: unknown;

	constructor() {}

	static buildLocationPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.identifier = identifier;
		filter.manager = {
			referenceType: "type.Organization",
			referenceId: organizationID,
		} as Reference;
		return filter;
	}

	static buildAttractionPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.identifier = identifier;
		filter.curator = {
			referenceType: "type.Attraction",
			referenceId: organizationID,
		} as Reference;
		return filter;
	}

	static buildEventPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.identifier = identifier;
		filter.organizer = {
			referenceType: "type.Event",
			referenceId: organizationID,
		} as Reference;
		return filter;
	}

	static buildOwnershipPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		if (identifier.startsWith("A_")) {
			return PermissionFilter.buildAttractionPermissionFilter(identifier, organizationID);
		} else if (identifier.startsWith("E_")) {
			return PermissionFilter.buildEventPermissionFilter(identifier, organizationID);
		} else if (identifier.startsWith("L_")) {
			return PermissionFilter.buildLocationPermissionFilter(identifier, organizationID);
		} else {
			throw new Error("Invalid identifier");
		}
	}
}
