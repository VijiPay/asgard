export interface IEmailVerificationRepository {
	updateVerificationEmail(
		email: string,
		emailVerifyCode: string,
		emailVerifyExpires: Date,
	): Promise<void>;

	getEmailVerificationCode(token: string): Promise<{
		code: string | null;
		expiryDate: Date | null;
	} | null>;
	confirmEmailVerification(token: string): Promise<void>;
}
