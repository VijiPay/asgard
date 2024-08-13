import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { CustomException } from "../../../shared/exceptions/CustomException";
import {
	EmailTemplatePath,
	type IEmailService,
} from "../../../shared/services/email/IEmailService";
import {
	expiresInDays,
	generateEmailVerificationToken,
} from "../../../shared/utils/tokenUtils";
import { AuthComponents } from "../constants/AuthComponents";
import type { IEmailVerificationRepository } from "../interfaces/IEmailVerificationRepository";
import type { IEmailVerificationService } from "../interfaces/IEmailVerificationService";

@singleton()
export class EmailVerificationService implements IEmailVerificationService {
	constructor(
		@inject(AuthComponents.EmailVerificationRepository)
		private emailRepository: IEmailVerificationRepository,
		@inject(Components.EmailService) private emailService: IEmailService,
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
				recipients: [email],
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
