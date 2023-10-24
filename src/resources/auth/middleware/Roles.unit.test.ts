import { Roles, checkPermissionForRole, getRoleByRoleName } from "./Roles";

describe("Roles Management", () => {
	it("should return correct role by name", () => {
		expect(getRoleByRoleName("admin").role).toBe("admin");
		expect(getRoleByRoleName("editor").role).toBe("editor");
		expect(getRoleByRoleName("UnbekannteRolle").role).toBe("unassigned");
		expect(getRoleByRoleName("member").role).toBe("member");
	});

	it("should correctly check permissions for role", () => {
		expect(checkPermissionForRole("admin", "GET:/attractions/")).toBe(true);
		expect(checkPermissionForRole("editor", "GET:/attractions/")).toBe(true);
		expect(checkPermissionForRole("member", "POST:/locations/search")).toBe(true);
		expect(checkPermissionForRole("unassigned", "GET:/attractions/")).toBe(false);
	});

	it("should be case-insensitive for role names", () => {
		expect(getRoleByRoleName("AdMin").role).toBe("admin");
		expect(checkPermissionForRole("eDitOR", "GET:/attractions/")).toBe(true);
	});

	it("should return false if role is undefined", () => {
		expect(checkPermissionForRole(undefined, "GET:/attractions/")).toBe(false);
	});
});

describe("getRoleByRoleName", () => {
	it("returns the correct role for a given role name", () => {
		const role = getRoleByRoleName("admin");
		expect(role).toBe(Roles.find((r) => r.role === "admin"));
	});

	it("returns unassigned role for an unknown role name", () => {
		const role = getRoleByRoleName("nonexistentRoleName");
		expect(role.role).toBe("unassigned");
	});

	it("ensures the unassigned role has no allowed routes", () => {
		const role = getRoleByRoleName("unassigned");
		expect(role.allowedRoutes.length).toBe(0);
	});
});

describe("checkPermissionForRole", () => {
	it("returns true if role has permission for the given action", () => {
		const result = checkPermissionForRole("admin", "GET:/attractions/");
		expect(result).toBe(true);
	});

	it("returns false if role does not have permission for the given action", () => {
		const result = checkPermissionForRole("admin", "NonExistentRoute");
		expect(result).toBe(false);
	});

	it("returns false if the role is unassigned", () => {
		const result = checkPermissionForRole("unassigned", "GET:/attractions/");
		expect(result).toBe(false);
	});

	it("returns false for an unknown role", () => {
		const result = checkPermissionForRole("nonexistentRole", "GET:/attractions/");
		expect(result).toBe(false);
	});

	it("returns true for an author with specific allowed action", () => {
		const result = checkPermissionForRole("author", "PATCH:/locations/:identifier");
		expect(result).toBe(true);
	});

	it("returns false for an author with disallowed action", () => {
		const result = checkPermissionForRole("author", "NonExistentRoute");
		expect(result).toBe(false);
	});
});
