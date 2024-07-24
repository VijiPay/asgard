export interface ITokenService {
	saveRefreshToken(
		userId: number,
		token: string,
		expiryDate: Date,
	): Promise<void>;

	getRefreshToken(
		token: string,
	): Promise<{ sessionToken: string; expires: Date } | null>;

	revokeRefreshToken(token: string): Promise<void>;

	invalidateUserSessions(userId: number): Promise<void>;
}
