import { Role } from "../../../generated/models/Role.generated";

type RoutePermission = {
	readonly role: Role;
	readonly allowedRoutes: ReadonlyArray<{
		readonly action: string;
		readonly restrictions?: readonly string[];
	}>;
};

export const admin = "admin";
export const editor = "editor";
export const author = "author";
export const member = "member";
export const unassigned = "unassigned";

export const Roles: readonly RoutePermission[] = [
	{
		role: admin,
		allowedRoutes: [
			{ action: "GET:/attractions/" },
			{ action: "POST:/attractions/" },
			{ action: "POST:/attractions/bulk-create" },
			{ action: "POST:/attractions/search" },
			{ action: "GET:/attractions/:identifier" },
			{ action: "PATCH:/attractions/:identifier" },
			{ action: "POST:/attractions/:identifier/externallinks" },
			{ action: "DELETE:/attractions/:identifier/externallinks" },
			{ action: "POST:/attractions/:identifier/archive" },
			{ action: "POST:/attractions/:identifier/unarchive" },
			{ action: "POST:/attractions/:identifier/publish" },
			{ action: "POST:/attractions/:identifier/unpublish" },
			{ action: "GET:/organizations/" },
			{ action: "POST:/organizations/" },
			{ action: "POST:/organizations/bulk-create" },
			{ action: "POST:/organizations/search" },
			{ action: "GET:/organizations/:identifier" },
			{ action: "PATCH:/organizations/:identifier" },
			{ action: "POST:/organizations/:identifier/activate" },
			{ action: "POST:/organizations/:identifier/deactivate" },
			{ action: "POST:/organizations/:identifier/retire" },
			{ action: "POST:/organizations/:identifier/publish" },
			{ action: "POST:/organizations/:identifier/unpublish" },
			{ action: "POST:/organizations/:identifier/archive" },
			{ action: "POST:/organizations/:identifier/unarchive" },
			{ action: "GET:/organizations/:identifier/memberships" },
			{ action: "POST:/organizations/:identifier/memberships" },
			{ action: "GET:/organizations/:identifier/memberships/:userIdentifier" },
			{ action: "DELETE:/organizations/:identifier/memberships/:userIdentifier" },
			{ action: "PATCH:/organizations/:identifier/memberships/:userIdentifier" },
			{ action: "GET:/events/" },
			{ action: "POST:/events/" },
			{ action: "POST:/events/bulk-create" },
			{ action: "POST:/events/search" },
			{ action: "GET:/events/:identifier" },
			{ action: "PATCH:/events/:identifier" },
			{ action: "PUT:/events/:identifier/locations" },
			{ action: "DELETE:/events/:identifier/locations" },
			{ action: "PUT:/events/:identifier/attractions" },
			{ action: "DELETE:/events/:identifier/attractions" },
			{ action: "PUT:/events/:identifier/organizer" },
			{ action: "DELETE:/events/:identifier/organizer" },
			{ action: "POST:/events/:identifier/publish" },
			{ action: "POST:/events/:identifier/unpublish" },
			{ action: "POST:/events/:identifier/reschedule" },
			{ action: "POST:/events/:identifier/postpone" },
			{ action: "POST:/events/:identifier/cancel" },
			{ action: "POST:/events/:identifier/archive" },
			{ action: "POST:/events/:identifier/unarchive" },
			{ action: "POST:/events/:identifier/duplicate" },
			{ action: "GET:/locations/" },
			{ action: "POST:/locations/" },
			{ action: "POST:/locations/bulk-create" },
			{ action: "POST:/locations/search" },
			{ action: "GET:/locations/:identifier" },
			{ action: "PATCH:/locations/:identifier" },
			{ action: "POST:/locations/:identifier/manager" },
			{ action: "DELETE:/locations/:identifier/manager" },
			{ action: "POST:/locations/:identifier/open" },
			{ action: "POST:/locations/:identifier/close" },
			{ action: "POST:/locations/:identifier/permanentlyClose" },
			{ action: "POST:/locations/:identifier/archive" },
			{ action: "POST:/locations/:identifier/unarchive" },
			{ action: "POST:/locations/:identifier/claim" },
			{ action: "POST:/locations/:identifier/publish" },
			{ action: "POST:/locations/:identifier/unpublish" },
		],
	},
	{
		role: editor,
		allowedRoutes: [
			{ action: "GET:/attractions/" },
			{ action: "POST:/attractions/" },
			{ action: "POST:/attractions/bulk-create" },
			{ action: "POST:/attractions/search" },
			{ action: "GET:/attractions/:identifier" },
			{ action: "PATCH:/attractions/:identifier" },
			{ action: "POST:/attractions/:identifier/externallinks" },
			{ action: "DELETE:/attractions/:identifier/externallinks" },
			{ action: "POST:/attractions/:identifier/archive" },
			{ action: "POST:/attractions/:identifier/unarchive" },
			{ action: "POST:/attractions/:identifier/publish" },
			{ action: "POST:/attractions/:identifier/unpublish" },
			{ action: "GET:/organizations/" },
			{ action: "POST:/organizations/search" },
			{ action: "GET:/organizations/:identifier" },
			{ action: "POST:/organizations/:identifier/publish" },
			{ action: "POST:/organizations/:identifier/unpublish" },
			{ action: "GET:/events/" },
			{ action: "POST:/events/" },
			{ action: "POST:/events/bulk-create" },
			{ action: "POST:/events/search" },
			{ action: "GET:/events/:identifier" },
			{ action: "PATCH:/events/:identifier" },
			{ action: "PUT:/events/:identifier/locations" },
			{ action: "DELETE:/events/:identifier/locations" },
			{ action: "PUT:/events/:identifier/attractions" },
			{ action: "DELETE:/events/:identifier/attractions" },
			{ action: "PUT:/events/:identifier/organizer" },
			{ action: "DELETE:/events/:identifier/organizer" },
			{ action: "POST:/events/:identifier/publish" },
			{ action: "POST:/events/:identifier/unpublish" },
			{ action: "POST:/events/:identifier/reschedule" },
			{ action: "POST:/events/:identifier/postpone" },
			{ action: "POST:/events/:identifier/cancel" },
			{ action: "POST:/events/:identifier/archive" },
			{ action: "POST:/events/:identifier/unarchive" },
			{ action: "POST:/events/:identifier/duplicate" },
			{ action: "GET:/locations/" },
			{ action: "POST:/locations/" },
			{ action: "POST:/locations/bulk-create" },
			{ action: "POST:/locations/search" },
			{ action: "GET:/locations/:identifier" },
			{ action: "PATCH:/locations/:identifier" },
			{ action: "POST:/locations/:identifier/manager" },
			{ action: "DELETE:/locations/:identifier/manager" },
			{ action: "POST:/locations/:identifier/open" },
			{ action: "POST:/locations/:identifier/close" },
			{ action: "POST:/locations/:identifier/permanentlyClose" },
			{ action: "POST:/locations/:identifier/archive" },
			{ action: "POST:/locations/:identifier/unarchive" },
			{ action: "POST:/locations/:identifier/publish" },
			{ action: "POST:/locations/:identifier/unpublish" },
		],
	},
	{
		role: author,
		allowedRoutes: [
			{ action: "GET:/attractions/" },
			{ action: "POST:/attractions/" },
			{ action: "POST:/attractions/bulk-create" },
			{ action: "POST:/attractions/search" },
			{ action: "GET:/attractions/:identifier" },
			{ action: "PATCH:/attractions/:identifier" },
			{ action: "POST:/attractions/:identifier/externallinks" },
			{ action: "DELETE:/attractions/:identifier/externallinks" },
			{ action: "POST:/attractions/:identifier/archive" },
			{ action: "POST:/attractions/:identifier/unarchive" },
			{ action: "GET:/organizations/" },
			{ action: "POST:/organizations/search" },
			{ action: "GET:/organizations/:identifier" },
			{ action: "GET:/events/" },
			{ action: "POST:/events/" },
			{ action: "POST:/events/bulk-create" },
			{ action: "POST:/events/search" },
			{ action: "GET:/events/:identifier" },
			{ action: "PATCH:/events/:identifier" },
			{ action: "PUT:/events/:identifier/locations" },
			{ action: "DELETE:/events/:identifier/locations" },
			{ action: "PUT:/events/:identifier/attractions" },
			{ action: "DELETE:/events/:identifier/attractions" },
			{ action: "PUT:/events/:identifier/organizer" },
			{ action: "DELETE:/events/:identifier/organizer" },
			{ action: "POST:/events/:identifier/reschedule" },
			{ action: "POST:/events/:identifier/postpone" },
			{ action: "POST:/events/:identifier/cancel" },
			{ action: "POST:/events/:identifier/archive" },
			{ action: "POST:/events/:identifier/unarchive" },
			{ action: "POST:/events/:identifier/duplicate" },
			{ action: "GET:/locations/" },
			{ action: "POST:/locations/" },
			{ action: "POST:/locations/bulk-create" },
			{ action: "POST:/locations/search" },
			{ action: "GET:/locations/:identifier" },
			{ action: "PATCH:/locations/:identifier" },
			{ action: "POST:/locations/:identifier/manager" },
			{ action: "DELETE:/locations/:identifier/manager" },
			{ action: "POST:/locations/:identifier/open" },
			{ action: "POST:/locations/:identifier/close" },
			{ action: "POST:/locations/:identifier/permanentlyClose" },
			{ action: "POST:/locations/:identifier/archive" },
			{ action: "POST:/locations/:identifier/unarchive" },
		],
	},
	{
		role: member,
		allowedRoutes: [
			{ action: "GET:/attractions/" },
			{ action: "GET:/attractions/:identifier" },
			{ action: "GET:/organizations/" },
			{ action: "POST:/organizations/search" },
			{ action: "GET:/organizations/:identifier" },
			{ action: "GET:/events/" },
			{ action: "POST:/events/search" },
			{ action: "GET:/events/:identifier" },
			{ action: "GET:/locations/" },
			{ action: "POST:/locations/search" },
			{ action: "GET:/locations/:identifier" },
		],
	},
	{
		role: unassigned,
		allowedRoutes: [],
	},
];

export function getRoleByRoleName(roleName: Role): RoutePermission {
	const lowerCaseRoleName = roleName.toLowerCase();
	const foundRole = Roles.find((role) => role.role === lowerCaseRoleName);
	return foundRole || Roles.find((role) => role.role === unassigned)!;
}

export function checkPermissionForRole(roleName: Role | undefined, action: string): boolean {
	if (!roleName) {
		return false;
	}
	const role = getRoleByRoleName(roleName);
	return role.allowedRoutes.some((route) => route.action === action);
}
