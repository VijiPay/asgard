export interface ITokenRepository {
	saveSessionToken(
		userId: number,
		accessToken: string,
		sessionToken: string,
		expiryDate: Date,
	): Promise<void>;

	generateAccessToken(
		sessionTokenToken: string,
		accessToken: string,
	): Promise<{
		accessToken: string;
		sessionToken: string;
		expires: Date;
	}>;

	getSessionToken(sessionToken: string): Promise<{
		accessToken: string;
		sessionToken: string;
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
