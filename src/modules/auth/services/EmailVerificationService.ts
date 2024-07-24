import { inject, singleton } from "tsyringe";
import { AuthComponents } from "../constants/AuthComponents";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IEmailVerificationService } from "../interfaces/IEmailVerificationService.ts";

@singleton()
export class EmailVerificationService implements IEmailVerificationService {
	constructor(
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
	) {}

	async updateVerificationEmail(
		email: string,
		emailVerifyCode: string,
		emailVerifyExpires: Date,
	): Promise<void> {
		await this.authRepository.updateVerificationEmail(
			email,
			emailVerifyCode,
			emailVerifyExpires,
		);
	}

	async getEmailVerificationCode(token: string): Promise<{
		code: string | undefined | null;
		expiryDate: Date | undefined | null;
	} | null> {
		return this.authRepository.getEmailVerificationCode(token);
	}

	async confirmEmailVerification(token: string): Promise<void> {
		await this.authRepository.confirmEmailVerification(token);
	}
}
