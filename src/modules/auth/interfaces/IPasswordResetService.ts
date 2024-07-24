export interface IPasswordResetService {
	createPasswordResetRequest(
		id: number,
		token: string,
		tokenExpiry: Date,
	): Promise<void>;

	verifyPasswordResetToken(token: string): Promise<{
		token: string | null;
		resetRequired: boolean | null;
		expiry: Date | null;
	}>;
	resetPassword(id: number, password: string): Promise<void>;
}
