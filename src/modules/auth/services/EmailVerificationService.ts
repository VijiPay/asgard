import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import {
	expiresInDays,
	generateEmailVerificationToken,
} from "../../../shared/utils/tokenUtils";
import { AuthComponents } from "../constants/AuthComponents";
import type { IEmailVerificationRepository } from "../interfaces/IEmailVerificationRepository";
import type { IEmailVerificationService } from "../interfaces/IEmailVerificationService.ts";

@singleton()
export class EmailVerificationService implements IEmailVerificationService {
	constructor(
		@inject(AuthComponents.EmailVerificationRepository)
		private emailRepository: IEmailVerificationRepository,
	) {}

	async sendEmailVerificationCode(email: string): Promise<void> {
		await this.emailRepository.updateVerificationEmail(
			email,
			generateEmailVerificationToken(),
			expiresInDays(2),
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
		await this.emailRepository.confirmEmailVerification(response.code);
	}
}
