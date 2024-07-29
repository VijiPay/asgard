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

	getRefreshToken(refreshToken: string): Promise<{
		accessToken: string;
		refreshToken: string;
		expires: Date;
	} | null>;

	verifyPasswordResetToken(token: string): Promise<{
		userId: number;
		token: string | null;
		resetRequired: boolean | null;
		expiry: Date | null;
	}>;

	revokeRefreshToken(token: string): Promise<void>;

	invalidateUserSessions(userId: number): Promise<void>;
}
