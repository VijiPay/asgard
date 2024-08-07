export interface IEmailData {
	templateId?: string;
	recipients?: string[];
	data?: Record<string, unknown>;
	isHTML?: boolean;
	isLayout?: boolean;
	templatePath: EmailTemplatePath;
}
export interface IEmailService {
	send(data: IEmailData): Promise<void>;
}

export interface IEmailConfig {
	baseUrl?: string;
	apiKey?: string;
	fromEmail?: string;
	fromName?: string;

	driver: string;
	encryption: string;
	host: string;
	name: string;
	password: string;
	username: string;
	port: number;
}
export interface EmailResponse {
	html?: string;
	markdown: string;
	subject?: string;
}

export enum EmailTemplatePath {
	EMAIL_CONFIRMED = "auth/email-confirmed",
	EMAIL_VERIFICATION = "auth/email-verification",
	FORGOT_PASSWORD_BY_EMAIL = "auth/forgot-password-by-email",
	PASSWORD_CHANGED = "user/password-changed",
	PHONE_VERIFICATION = "auth/phone-verification",
	REGISTRATION = "user/registration",
}
