import { AuthUser } from "../../../generated/models/AuthUser.generated";

export enum PermissionFlag {
	REGISTERED_USER = 1,
	SEE_UNPUBLISHED_EVENTS = 2,
	SEE_UNPUBLISHED_VENUES = 4,
	CREATE_AND_EDIT_EVENTS = 8,
	CREATE_AND_EDIT_VENUES = 16,
	PUBLISH_EVENTS = 32,
	PUBLISH_VENUES = 64,
	EDIT_ORGANIZER = 128,
	ORGANIZER_ADMIN_PERMISSION = 256,
	ADMIN_PERMISSION = 8192,
	ALL_PERMISSIONS = 2147483647,
}

export function checkPermission(permissionFlags: number | undefined, requiredPermission: PermissionFlag): boolean {
	if (!permissionFlags) return false;
	return (permissionFlags & requiredPermission) === requiredPermission;
}

export function isSuperAdmin(user: AuthUser | undefined): boolean {
	return checkPermission(user?.permissionFlags, PermissionFlag.ADMIN_PERMISSION);
}
