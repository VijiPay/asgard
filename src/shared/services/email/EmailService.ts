import { inject, injectable } from "tsyringe";
import { Components } from "../../constants/Components";
import type { IEmailData, IEmailService } from "./IEmailService";
import type { IEmailProvider } from "./providers/IEmailProvider";

@injectable()
export class EmailService implements IEmailService {
	constructor(
		@inject(Components.EmailProvider)
		private readonly provider: IEmailProvider,
	) {}

	async send(data: IEmailData): Promise<void> {
		await this.provider.send(data);
	}
}
