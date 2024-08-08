import { createTransport } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { EmailTemplateUtil } from "../../../utils/emailTemplate";
import type { EmailMessage } from "../EmailType";
import type { IEmailConfig } from "../IEmailService";
import type { IEmailProvider } from "./IEmailProvider";

export class NodeMailer implements IEmailProvider {
	config: IEmailConfig;
	private readonly client: Mail;

	constructor(config: IEmailConfig) {
		this.config = config;
		this.client = createTransport({
			host: config.host,
			port: config.port,
			// secure: config.encryption,
			auth: {
				user: config.username,
				pass: config.password,
			},
		});
	}

	async send(data: EmailMessage): Promise<void> {
		if (data.templatePath) {
			const { subject, html, markdown } =
				await new EmailTemplateUtil().getMessage({
					templatePath: data.templatePath,
					data: data.data,
					isLayout: true,
					isHTML: true,
				});

			data.subject = data.subject ?? subject;
			data.html = html;
			data.text = markdown;

			data.alternatives = [
				{ contentType: "text/x-web-markdown", content: markdown },
			];
		}

		await this.client.sendMail({
			...data,
			from: data.from ?? `"${this.config.name}" <${this.config.fromEmail}>`,
		});
	}
}
