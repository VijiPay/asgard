import { inject, singleton } from "tsyringe";
import { Components } from "../../constants/Components";
import type { EmailTemplateOption, IEmail } from "./IEmail";
import type { IEmailProvider } from "./providers/IEmailProvider";

@singleton()
export class Email implements IEmail {
	constructor(
		@inject(Components.EmailProvider)
		private readonly provider: IEmailProvider,
	) {}

	async send(data: EmailTemplateOption): Promise<void> {
		await this.provider.send(data);
	}
}
