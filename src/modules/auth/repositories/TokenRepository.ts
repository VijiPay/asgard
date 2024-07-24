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
		token: string,
		expiryDate: Date,
	): Promise<void> {
		await this.connection.session.create({
			data: {
				userId,
				sessionToken: token,
				expires: expiryDate,
			},
		});
	}

	getRefreshToken(
		token: string,
	): Promise<{ sessionToken: string; expires: Date } | null> {
		return this.connection.session.findUnique({
			where: { sessionToken: token },
		});
	}

	async verifyPasswordResetToken(token: string): Promise<{
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
