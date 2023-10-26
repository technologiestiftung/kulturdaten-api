import debug from "debug";
import express from "express";
import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { SuccessResponseBuilder } from "../../../common/responses/SuccessResponseBuilder";
import { UsersService } from "../../users/services/UsersService";
import { AuthUser } from "../strategies/AuthPasswordStrategy";
import { AccessToken } from "../../../generated/models/AccessToken.generated";
import { User } from "../../../generated/models/User.generated";
import { OrganizationsService } from "../../organizations/services/OrganizationsService";
import { LoginResponse } from "../../../generated/models/LoginResponse.generated";
import { Organization } from "../../../generated/models/Organization.generated";

const log: debug.IDebugger = debug("app:auth-controller");

const jwtSecret = process.env.JWT_SECRET!;

const authTokenExpiresIn = process.env.AUTH_TOKEN_EXPIRES_IN || "1m";

@Service()
export class AuthController {
	constructor(
		public usersService: UsersService,
		public organizationsService: OrganizationsService,
	) {}

	async login(req: express.Request, res: express.Response) {
		if (req.user) {
			const authUser = req.user as AuthUser;

			const accessTokens: AccessToken[] = this.generateAccessTokens(authUser);
			const user = await this.usersService.readById(authUser.identifier);
			const organizations: Organization[] = await this.getOrganizationsForMemberships(user);

			if (user) {
				return res.status(200).send(
					new SuccessResponseBuilder<LoginResponse>()
						.okResponse({
							accessTokens: accessTokens,
							user: user as User,
							organizations: organizations,
						})
						.build(),
				);
			}
		}
		return res.status(400).send();
	}

	private generateAccessTokens(authUser: AuthUser) {
		const accessTokens: AccessToken[] = [];
		authUser.memberships.forEach((membership: any) => {
			accessTokens.push({
				token: this.generateToken(
					authUser.identifier,
					authUser.permissionFlags,
					membership.organizationIdentifier,
					membership.role,
				),
				organizationID: membership.organizationIdentifier,
				role: membership.role,
			});
		});
		accessTokens.push({
			token: this.generateToken(authUser.identifier, authUser.permissionFlags),
		});
		return accessTokens;
	}

	private async getOrganizationsForMemberships(user: User | null) {
		const organizations: Organization[] = [];
		for (const membership of user?.memberships || []) {
			if (membership.organizationIdentifier) {
				const organization = await this.organizationsService.readById(membership.organizationIdentifier);
				if (organization) {
					organizations.push(organization);
				}
			}
		}
		return organizations;
	}

	private generateToken(
		userIdentifier: string,
		permissionFlags: number,
		organizationIdentifier?: string,
		role?: string,
	) {
		return jwt.sign(
			{
				identifier: userIdentifier,
				organizationIdentifier,
				role: role,
				permissionFlags,
			},
			jwtSecret,
			{
				expiresIn: authTokenExpiresIn,
			},
		);
	}
}
