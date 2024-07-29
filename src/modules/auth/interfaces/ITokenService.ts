export interface ITokenService {
	refreshAccessToken(
		refreshTokenoken: string,
	): Promise<{ accessToken: string }>;

	revokeRefreshToken(token: string): Promise<void>;

	invalidateUserSessions(userId: number): Promise<void>;
}
