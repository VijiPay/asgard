export interface IEmailVerificationRepository {
	updateVerificationEmail(
		email: string,
		emailVerifyCode: string,
		emailVerifyExpires: Date,
	): Promise<void>;

	getEmailVerificationCode(token: string): Promise<{
		code: string | undefined | null;
		expiryDate: Date | undefined | null;
	} | null>;
	confirmEmailVerification(token: string): Promise<void>;
}
