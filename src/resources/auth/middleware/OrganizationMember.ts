export interface OrganizationMember {
	identifier: string;
	organizationIdentifier?: string;
	role?: string;
	permissionFlags: number;
}
