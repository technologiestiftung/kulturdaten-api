import { Filter } from "../../../generated/models/Filter.generated";

export interface ResourcePermissionController {
	isExist(permissionFilter: Filter): Promise<boolean>;
}
