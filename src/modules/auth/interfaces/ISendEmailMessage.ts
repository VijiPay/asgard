export interface ISendEmailMessage {
	sendEmailVerificationCode(email: string): Promise<void>;

	verifyEmail(token: string): Promise<void>;
}

