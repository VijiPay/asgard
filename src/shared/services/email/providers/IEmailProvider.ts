import type { EmailTemplateOption } from "../IEmail";

export interface IEmailProvider {
	send(data: EmailTemplateOption): Promise<void>;
}
