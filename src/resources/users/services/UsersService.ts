import { Inject, Service } from "typedi";
import { CreateUserRequest } from "../../../generated/models/CreateUserRequest.generated";
import { UpdateUserRequest } from "../../../generated/models/UpdateUserRequest.generated";
import { UsersRepository } from "../repositories/UsersRepository";
import { CreateMembershipRequest } from "../../../generated/models/CreateMembershipRequest.generated";
import {
	generateMembershipFromMembershipRequest,
	generateOrganizationMembershipFor,
	generateOrganizationMembershipsFor,
} from "../../../utils/MembershipUtil";
import { OrganizationMembership } from "../../../generated/models/OrganizationMembership.generated";
import { UpdateOrganizationMembershipRequest } from "../../../generated/models/UpdateOrganizationMembershipRequest.generated";
import { Pagination } from "../../../generated/models/Pagination.generated";

@Service()
export class UsersService {
	constructor(@Inject("UsersRepository") public usersRepository: UsersRepository) {}

	async create(createUser: CreateUserRequest) {
		return this.usersRepository.addUser(createUser);
	}

	async deleteById(id: string) {
		return this.usersRepository.removeUserById(id);
	}

	async list(pagination?: Pagination) {
		return this.usersRepository.getUsers(pagination);
	}

	async patchById(id: string, resource: UpdateUserRequest) {
		return this.usersRepository.updateUserById(id, resource);
	}

	async readById(id: string) {
		return this.usersRepository.getUserByIdentifier(id);
	}

	async getUserByEmail(email: string) {
		return this.usersRepository.getUserByEmail(email);
	}

	async getUserByEmailWithPassword(email: string) {
		return this.usersRepository.getUserByEmailWithPassword(email);
	}

	async countUsers(): Promise<number> {
		return this.usersRepository.countUsers();
	}

	async listMembershipsFor(organizationIdentifier: string): Promise<OrganizationMembership[]> {
		const members = await this.usersRepository.searchAllUsers({
			"memberships.organizationIdentifier": organizationIdentifier,
		});
		return generateOrganizationMembershipsFor(organizationIdentifier, members);
	}

	async createMembership(organizationIdentifier: string, createMembership: CreateMembershipRequest) {
		const newMembership = generateMembershipFromMembershipRequest(organizationIdentifier, createMembership);
		return this.usersRepository.addMembership(createMembership.email, newMembership);
	}

	async isUserExists(email: string): Promise<boolean> {
		const user = await this.usersRepository.getUserByEmail(email);
		if (user) return true;
		return false;
	}

	async getMembershipFor(
		organizationIdentifier: string,
		userIdentifier: string,
	): Promise<OrganizationMembership | null> {
		const member = await this.usersRepository.searchUser({
			identifier: userIdentifier,
			"memberships.organizationIdentifier": organizationIdentifier,
		});
		return generateOrganizationMembershipFor(organizationIdentifier, member);
	}

	async deleteMembership(userIdentifier: string, organizationIdentifier: string): Promise<boolean> {
		return this.usersRepository.deleteMembership(userIdentifier, organizationIdentifier);
	}

	async updateMembership(
		userIdentifier: string,
		organizationIdentifier: string,
		updateOrganizationMembershipRequest: UpdateOrganizationMembershipRequest,
	) {
		return this.usersRepository.updateOrganizationMembership(
			userIdentifier,
			organizationIdentifier,
			updateOrganizationMembershipRequest,
		);
	}
}
