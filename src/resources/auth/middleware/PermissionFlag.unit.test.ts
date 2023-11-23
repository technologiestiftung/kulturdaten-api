import { PermissionFlag, checkPermission } from "./PermissionFlag";

describe("checkPermission", () => {
	test("returns true when required permission is present", () => {
		const permissions = PermissionFlag.REGISTERED_USER | PermissionFlag.PUBLISH_EVENTS;
		expect(checkPermission(permissions, PermissionFlag.PUBLISH_EVENTS)).toBe(true);
	});

	test("returns false when required permission is not present", () => {
		const permissions = PermissionFlag.REGISTERED_USER;
		expect(checkPermission(permissions, PermissionFlag.PUBLISH_EVENTS)).toBe(false);
	});

	test("works correctly with multiple permissions", () => {
		const permissions = PermissionFlag.REGISTERED_USER | PermissionFlag.PUBLISH_EVENTS | PermissionFlag.EDIT_ORGANIZER;
		expect(checkPermission(permissions, PermissionFlag.EDIT_ORGANIZER)).toBe(true);
		expect(checkPermission(permissions, PermissionFlag.ADMIN_PERMISSION)).toBe(false);
	});

	test("handles ALL_PERMISSIONS correctly", () => {
		const permissions = PermissionFlag.ALL_PERMISSIONS;
		expect(checkPermission(permissions, PermissionFlag.ADMIN_PERMISSION)).toBe(true);
	});

	test("returns false with no permissions", () => {
		const permissions = 0;
		expect(checkPermission(permissions, PermissionFlag.REGISTERED_USER)).toBe(false);
	});
});
