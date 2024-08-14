import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { EmailTemplatePath } from "../../../shared/enums/EmailTemplatePath";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { INotificationService } from "../../../shared/services/notification/INotificationService";
import { encryptPassword } from "../../../shared/utils/jwt";
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
		@inject(Components.NotificationService)
		private notification: INotificationService,
	) {}

	async forgotPasswordRequest(email: ForgotPasswordDTO): Promise<void> {
		const user = await this.user.findByEmail(email.email);
		if (!user) {
			throw new CustomException("User not found", httpStatus.NOT_FOUND);
		}
		const resetToken = generatePasswordResetToken();
		await this.authRepository.createPasswordResetRequest(
			user.id,
			resetToken,
			expiresInHours(1),
		);
		this.notification.send(
			{ email: email.email },
			{
				templatePath: EmailTemplatePath.FORGOT_PASSWORD_BY_EMAIL,
				data: { code: resetToken, time: "1 hour" },
			},
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
		const user = await this.user.findById(validateToken.userId);
		this.notification.send(
			{ email: user?.email },
			{
				templatePath: EmailTemplatePath.PASSWORD_CHANGED,
			},
		);
	}

	async updatePassword(data: UpdatePasswordDTO): Promise<void> {
		const hashedPassword = await encryptPassword(data.newPassword);
		await this.authRepository.updatePasswordDirectly(data.id, hashedPassword);
		this.notification.send(
			{ email: data.email },
			{
				templatePath: EmailTemplatePath.PASSWORD_CHANGED,
			},
		);
	}
}
