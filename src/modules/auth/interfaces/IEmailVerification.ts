export interface IEmailVerification {
	sendEmailVerificationCode(email: string): Promise<void>;

	verifyEmail(token: string): Promise<void>;
}

