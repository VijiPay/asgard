import type { EmailTemplatePath } from "../../enums/EmailTemplatePath";

export interface IEmailData {
	templateId?: string;
	recipients?: string[];
}

export type EmailTemplateOption = {
	to: string[];
	data?: Record<string, number | string | boolean>;
	isHTML?: boolean;
	isLayout?: boolean;
	templatePath: EmailTemplatePath;
};

export interface IEmail {
	send(data: EmailTemplateOption): Promise<void>;
}

export interface IEmailConfig {
	baseUrl?: string;
	apiKey?: string;
	fromEmail?: string;
	fromName?: string;

	driver?: string;
	encryption?: string;
	host?: string;
	name?: string;
	password?: string;
	username?: string;
	port?: number;
}
export interface EmailResponse {
	html?: string;
	markdown: string;
	subject?: string;
	recipients: string[];
}
