import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { EmailTemplatePath } from "../../../shared/enums/EmailTemplatePath";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { IEmail } from "../../../shared/services/email/IEmail";
import {
	expiresInDays,
	generateEmailVerificationToken,
} from "../../../shared/utils/tokenUtils";
import { AuthComponents } from "../constants/AuthComponents";
import type { ISendEmailMessage } from "../interfaces/ISendEmailMessage";
import type { ISendEmailRepository } from "../interfaces/ISendEmailRepository";

@singleton()
export class SendEmailMessage implements ISendEmailMessage {
	constructor(
		@inject(AuthComponents.SendEmailRepository)
		private emailRepository: ISendEmailRepository,
		@inject(Components.Email) private emailService: IEmail,
	) {}

	async sendEmailVerificationCode(email: string): Promise<void> {
		const token = generateEmailVerificationToken();
		await this.emailRepository.updateVerificationEmail(
			email,
			token,
			expiresInDays(2),
		);
		try {
			await this.emailService.send({
				to: [email],
				templatePath: EmailTemplatePath.EMAIL_VERIFICATION,
				data: { token },
				isHTML: true,
				isLayout: true,
			});
		} catch (error) {
			throw new CustomException(
				"Failed to send verification email",
				httpStatus.INTERNAL_SERVER_ERROR,
				error,
			);
		}
	}

	async verifyEmail(token: string): Promise<void> {
		const response = await this.emailRepository.getEmailVerificationCode(token);

		if (!response?.expiryDate || response.expiryDate.getTime() < Date.now()) {
			throw new CustomException("verification.expired");
		}
		if (!response.code) {
			throw new CustomException("invalid.token");
		}
		await this.emailRepository.confirmEmailVerification(response.code);
	}
}
