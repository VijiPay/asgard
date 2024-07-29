import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { ITokenRepository } from "../interfaces/ITokenRepository";

@injectable()
export class TokenRepository implements ITokenRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async saveRefreshToken(
		userId: number,
		accessToken: string,
		refreshToken: string,
		expiryDate: Date,
	): Promise<void> {
		await this.connection.session.create({
			data: {
				userId,
				accessToken,
				refreshToken,
				expires: expiryDate,
			},
		});
	}

	async generateAccessToken(
		refreshToken: string,
		accessToken: string,
	): Promise<{ accessToken: string; refreshToken: string; expires: Date }> {
		return await this.connection.session.update({
			where: { refreshToken },
			data: { accessToken },
		});
	}
	async getRefreshToken(refreshToken: string): Promise<{
		accessToken: string;
		refreshToken: string;
		expires: Date;
	} | null> {
		return await this.connection.session.findUnique({
			where: { refreshToken },
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
			where: { refreshToken: token },
		});
	}
	async invalidateUserSessions(userId: number): Promise<void> {
		await this.connection.session.deleteMany({
			where: { userId },
		});
	}
}
