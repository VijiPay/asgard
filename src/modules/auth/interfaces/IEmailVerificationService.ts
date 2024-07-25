export interface IEmailVerificationService {
	sendEmailVerificationCode(email: string): Promise<void>;

	verifyEmail(token: string): Promise<void>;
}
