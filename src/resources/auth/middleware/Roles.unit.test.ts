import { checkPermissionForRole, getRoleByRoleName, Roles } from "./Roles";

describe("getRoleByRoleName", () => {
	it("returns the correct role for a given role name", () => {
		const role = getRoleByRoleName("admin");
		expect(role).toBe(Roles.find((r) => r.role === "admin"));
	});

	it("returns the author role with correct restrictions", () => {
		const role = getRoleByRoleName("author");
		const expectedRestrictions = ["ownership", "affiliation"];
		const pathRestrictions = role.allowedRoutes.find((route) => route.action === "PATCH:/locations/")?.restrictions;
		expect(pathRestrictions).toEqual(expectedRestrictions);
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
		const result = checkPermissionForRole("admin", "PATCH:/locations/");
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
		const result = checkPermissionForRole("author", "PATCH:/locations/");
		expect(result).toBe(true);
	});

	it("returns false for an author with disallowed action", () => {
		const result = checkPermissionForRole("author", "DELETE:/locations/");
		expect(result).toBe(false);
	});
});
