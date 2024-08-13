import { createTransport } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { singleton } from "tsyringe";
import { EmailTemplateUtil } from "../../../utils/emailTemplate";
import type { EmailMessage } from "../EmailType";
import type { IEmailConfig } from "../IEmail";
import type { IEmailProvider } from "./IEmailProvider";

@singleton()
export class NodeMailer implements IEmailProvider {
	config: IEmailConfig;
	private readonly client: Mail;

	constructor(config: IEmailConfig) {
		this.config = config;
		this.client = createTransport({
			host: config.host,
			port: config.port,
			service: config.driver,
			secure: false,
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
					to: [data.to as string],
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
			from: `"${this.config.name}" <no-reply@vijipay.ng>`,
		});
	}
}
