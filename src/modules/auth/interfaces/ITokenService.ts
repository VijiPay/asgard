export interface ITokenService {
	refreshAccessToken(
		sessionTokenoken: string,
	): Promise<{ accessToken: string }>;

	revokeSessionToken(token: string): Promise<void>;

	invalidateUserSessions(userId: number): Promise<void>;
}
