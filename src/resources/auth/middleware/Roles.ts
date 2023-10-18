export type Role = {
	readonly role: string;
	readonly allowedRoutes: ReadonlyArray<{
		readonly action: string;
		readonly restrictions?: readonly string[];
	}>;
};

export const Roles: readonly Role[] = [
	{
		role: "admin",
		allowedRoutes: [{ action: "GET:/attractions/" }],
	},
	{
		role: "author",
		allowedRoutes: [
			{ action: "GET:/attractions/" },
			{ action: "PATCH:/locations/", restrictions: ["ownership", "affiliation"] },
		],
	},
	{
		role: "unassigned",
		allowedRoutes: [],
	},
];

export function getRoleByRoleName(roleName: string): Role {
	const foundRole = Roles.find((role) => role.role === roleName);
	return foundRole || Roles.find((role) => role.role === "unassigned")!;
}

export function checkPermissionForRole(roleName: string, action: string): boolean {
	const role = getRoleByRoleName(roleName);
	return role.allowedRoutes.some((route) => route.action === action);
}
