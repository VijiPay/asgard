import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { decryptPassword, encryptPassword } from "../../../shared/utils/jwt";
import {
	expiresInHours,
	generatePasswordResetToken,
} from "../../../shared/utils/tokenUtils";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserService } from "../../user/interface/IGetUserService";
import { AuthComponents } from "../constants/AuthComponents";
import type { ForgotPasswordDTO } from "../dtos/ForgotPasswordDTO";
import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
import type { UpdatePasswordDTO } from "../dtos/UpdatePasswordDTO";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IPasswordService } from "../interfaces/IPasswordService";
import type { ITokenRepository } from "../interfaces/ITokenRepository";

@singleton()
export class PasswordService implements IPasswordService {
	constructor(
		@inject(UserComponents.GetUserService)
		private user: IGetUserService,
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
		@inject(AuthComponents.TokenRepository)
		private tokenRepository: ITokenRepository,
	) {}

	async forgotPasswordRequest(email: ForgotPasswordDTO): Promise<void> {
		const e = email as unknown as string;
		const user = await this.user.findByEmail(e);
		if (!user) {
			throw new CustomException("User not found", httpStatus.NOT_FOUND);
		}

		await this.authRepository.createPasswordResetRequest(
			user.id,
			generatePasswordResetToken(),
			expiresInHours(1),
		);
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

	async updatePassword(data: UpdatePasswordDTO): Promise<void> {
		const existingUser = await this.user.findRaw(data.id);
		if (
			existingUser &&
			(await decryptPassword(data.oldPassword, existingUser?.password)) &&
			data.oldPassword === data.newPassword
		) {
			throw new CustomException("cannot use existing password");
		}
		const hashedPassword = await encryptPassword(data.newPassword);
		await this.authRepository.updatePasswordDirectly(data.id, hashedPassword);
	}
}
