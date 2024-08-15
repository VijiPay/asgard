import type { Session } from "@prisma/client";

export interface ITokenRepository {
	saveRefreshToken(
		userId: number,
		accessToken: string,
		refreshToken: string,
		expiryDate: Date,
	): Promise<void>;

	generateAccessToken(
		refreshTokenToken: string,
		accessToken: string,
	): Promise<{
		accessToken: string;
		refreshToken: string;
		expires: Date;
	}>;

	getRefreshToken(refreshToken: string): Promise<Session | null>;

	verifyPasswordResetToken(token: string): Promise<{
		userId: number;
		token: string | null;
		resetRequired: boolean | null;
		expiry: Date | null;
	}>;

	revokeRefreshToken(tokenId: number): Promise<void>;

	invalidateUserSessions(userId: number): Promise<void>;
}
