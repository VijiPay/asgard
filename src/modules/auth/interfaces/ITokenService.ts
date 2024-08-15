export interface ITokenService {
	refreshAccessToken(
		refreshTokenoken: string,
	): Promise<{ accessToken: string }>;

	revokeRefreshToken(tokenId: number): Promise<void>;

	getSession(
		token: string,
	): Promise<{ refreshToken: string; sessionId: number } | null>;

	invalidateUserSessions(userId: number): Promise<void>;
}
