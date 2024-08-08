import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { encryptPassword } from "../../../shared/utils/jwt";
import {
	expiresInHours,
	generatePasswordResetToken,
} from "../../../shared/utils/tokenUtils";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import { AuthComponents } from "../constants/AuthComponents";
import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IPasswordService } from "../interfaces/IPasswordService";
import type { ITokenRepository } from "../interfaces/ITokenRepository";

@singleton()
export class PasswordService implements IPasswordService {
	constructor(
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
		@inject(AuthComponents.TokenRepository)
		private tokenRepository: ITokenRepository,
	) {}

	async forgotPasswordRequest(email: string): Promise<string> {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new CustomException("User not found", httpStatus.NOT_FOUND);
		}

		await this.authRepository.createPasswordResetRequest(
			user.id,
			generatePasswordResetToken(),
			expiresInHours(1),
		);

		return "request.sent";
	}

	async resetPassword(data: ResetPasswordDTO): Promise<void> {
		const validateToken = await this.tokenRepository.verifyPasswordResetToken(
			data.token,
		);

		if (!validateToken.expiry || validateToken.expiry?.getTime() < Date.now()) {
			throw new CustomException("token.expired");
		}
		const hashedPassword = await encryptPassword(data.newPassword);
		this.authRepository.updatePassword(validateToken.userId, hashedPassword);
	}

	async updatePassword(
		id: number,
		oldPassword: string,
		newPassword: string,
		confirmNewPassword: string,
	): Promise<void> {
		if (oldPassword === newPassword) {
			throw new CustomException("Cannot use same password");
		}
		if (newPassword !== confirmNewPassword) {
			throw new CustomException("password.mismatch");
		}
		const hashedPassword = await encryptPassword(newPassword);
		await this.authRepository.updatePasswordDirectly(id, hashedPassword);
	}
}
