import { CreateMembershipRequest } from "../generated/models/CreateMembershipRequest.generated";
import { Membership } from "../generated/models/Membership.generated";
import { OrganizationMembership } from "../generated/models/OrganizationMembership.generated";
import { Role } from "../generated/models/Role.generated";
import { User } from "../generated/models/User.generated";

export function generateMembershipFromMembershipRequest(
	organizationIdentifier: string,
	organizationMembership: CreateMembershipRequest,
): Membership {
	return {
		organizationIdentifier,
		role: organizationMembership.role,
	};
}

export function generateOrganizationMembership(user: User, role: Role): OrganizationMembership {
	return {
		email: user.email,
		userIdentifier: user.identifier,
		firstName: user.firstName,
		lastName: user.lastName,
		role: role,
	};
}
