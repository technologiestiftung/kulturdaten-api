import { Filter } from "../../../generated/models/Filter.generated";

export class PermissionFilter implements Filter {
	[k: string]: unknown;

	constructor() {}

	private initializeOwnershipPermissionProperty(identifier: string, organizationID: string) {
		let property: string;
		if (identifier.startsWith("A_")) {
			property = "curator";
		} else if (identifier.startsWith("E_")) {
			property = "organizer";
		} else if (identifier.startsWith("L_")) {
			property = "manager";
		} else {
			throw new Error("Invalid identifier");
		}

		this[property] = organizationID;
	}

	static buildOwnershipPermissionFilter(identifier: string, organizationID: string): PermissionFilter {
		const filter = new PermissionFilter();
		filter.initializeOwnershipPermissionProperty(identifier, organizationID);
		return filter;
	}
}
