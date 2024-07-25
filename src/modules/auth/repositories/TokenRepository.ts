import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { ITokenRepository } from "../interfaces/ITokenRepository";

@injectable()
export class TokenRepository implements ITokenRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async saveSessionToken(
		userId: number,
		accessToken: string,
		sessionToken: string,
		expiryDate: Date,
	): Promise<void> {
		await this.connection.session.create({
			data: {
				userId,
				accessToken,
				sessionToken,
				expires: expiryDate,
			},
		});
	}

	async generateAccessToken(
		sessionToken: string,
		accessToken: string,
	): Promise<{ accessToken: string; sessionToken: string; expires: Date }> {
		return await this.connection.session.update({
			where: { sessionToken },
			data: { accessToken },
		});
	}
	async getSessionToken(sessionToken: string): Promise<{
		accessToken: string;
		sessionToken: string;
		expires: Date;
	} | null> {
		return await this.connection.session.findUnique({
			where: { sessionToken },
		});
	}

	async verifyPasswordResetToken(token: string): Promise<{
		userId: number;
		token: string | null;
		resetRequired: boolean | null;
		expiry: Date | null;
	}> {
		const res = await this.connection.profile.findFirstOrThrow({
			where: {
				passwordResetToken: token,
			},
		});

		return {
			userId: res.userId,
			token: res.passwordResetToken,
			resetRequired: res.passwordReset,
			expiry: res.passwordResetExpires,
		};
	}

	async revokeRefreshToken(token: string): Promise<void> {
		await this.connection.session.delete({
			where: { sessionToken: token },
		});
	}
	async invalidateUserSessions(userId: number): Promise<void> {
		await this.connection.session.deleteMany({
			where: { userId },
		});
	}
}
