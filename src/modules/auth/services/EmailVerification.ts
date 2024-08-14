import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { EmailTemplatePath } from "../../../shared/enums/EmailTemplatePath";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { INotificationService } from "../../../shared/services/notification/INotificationService";
import {
	expiresInDays,
	generateEmailVerificationToken,
} from "../../../shared/utils/tokenUtils";
import { AuthComponents } from "../constants/AuthComponents";
import type { IEmailVerification } from "../interfaces/IEmailVerification";
import type { IEmailVerificationRepository } from "../interfaces/IEmailVerificationRepository";

@singleton()
export class SendEmailMessage implements IEmailVerification {
	constructor(
		@inject(AuthComponents.EmailVerificationRepository)
		private emailRepository: IEmailVerificationRepository,
		@inject(Components.NotificationService)
		private notification: INotificationService,
	) {}

	async sendEmailVerificationCode(email: string): Promise<void> {
		const token = generateEmailVerificationToken();
		await this.emailRepository.updateVerificationEmail(
			email,
			token,
			expiresInDays(2),
		);
		this.notification.send(
			{ email: email },
			{
				templatePath: EmailTemplatePath.EMAIL_VERIFICATION,
				data: {
					code: token,
					time: "48 hours",
				},
			},
		);
	}

	async verifyEmail(token: string): Promise<void> {
		const response = await this.emailRepository.getEmailVerificationCode(token);

		if (!response?.expiryDate || response.expiryDate.getTime() < Date.now()) {
			throw new CustomException("verification.expired");
		}
		if (!response.code) {
			throw new CustomException("invalid.token");
		}
		const user = await this.emailRepository.confirmEmailVerification(
			response.code,
		);

		this.notification.send(
			{ email: user },
			{
				templatePath: EmailTemplatePath.EMAIL_CONFIRMED,
			},
		);
	}
}
