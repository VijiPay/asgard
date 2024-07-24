export interface ITokenRepository {
	saveRefreshToken(
		userId: number,
		token: string,
		expiryDate: Date,
	): Promise<void>;

	getRefreshToken(
		token: string,
	): Promise<{ sessionToken: string; expires: Date } | null>;

	verifyPasswordResetToken(token: string): Promise<{
		token: string | null;
		resetRequired: boolean | null;
		expiry: Date | null;
	}>;

	revokeRefreshToken(token: string): Promise<void>;

	invalidateUserSessions(userId: number): Promise<void>;
}
