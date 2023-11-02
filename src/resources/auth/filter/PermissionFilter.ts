import { Filter } from "../../../generated/models/Filter.generated";

export class PermissionFilter implements Filter {
	[k: string]: unknown;

	constructor() {}

	static buildLocationPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.$and = [
			{ identifier: identifier },
			{ "manager.referenceType": "type.Organization" },
			{ "manager.referenceId": organizationID },
		];
		return filter;
	}

	static buildAttractionPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.$and = [
			{ identifier: identifier },
			{ "curator.referenceType": "type.Organization" },
			{ "curator.referenceId": organizationID },
		];
		return filter;
	}

	static buildEventPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.$and = [
			{ identifier: identifier },
			{ "organizer.referenceType": "type.Organization" },
			{ "organizer.referenceId": organizationID },
		];
		return filter;
	}

	static buildInvalidPermissionFilter(): PermissionFilter {
		const filter = new PermissionFilter();
		filter.invalidField = "ThisFieldDoesNotExist";
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
			return PermissionFilter.buildInvalidPermissionFilter();
		}
	}
}
