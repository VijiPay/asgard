import { inject } from "tsyringe";
import { Components } from "../../../constants/Components";
import type { Http } from "../../http/Http";
import type { IEmailConfig, IEmailData } from "../IEmailService";
import type { IEmailProvider } from "./IEmailProvider";

export class SendGrid implements IEmailProvider {
	config: IEmailConfig;

	constructor(
		@inject(Components.Http)
		private readonly http: Http,
		config: IEmailConfig,
	) {
		this.config = config;
	}

	async send(payload: IEmailData): Promise<void> {
		const { baseUrl, apiKey, fromEmail, fromName } = this.config;
		const data = {
			from: {
				email: fromEmail,
				name: fromName,
			},
			template_id: payload.templateId,
			personalizations: payload.recipients?.map((recipient) => ({
				to: [
					{
						email: recipient,
					},
				],
				dynamic_template_data: payload.data,
			})),
		};
		const { href: url } = new URL("/v3/mail/send", baseUrl);
		await this.http.post(url, data, {
			Authorization: `Bearer ${apiKey}`,
			"Content-Type": "application/json",
		});
	}
}
