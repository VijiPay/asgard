import httpStatus from "http-status";
import { Body, Controller, Middlewares, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { ValidateBody } from "../../../shared/middleware/ValidateBody";
import { decryptPassword } from "../../../shared/utils/jwt";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserService } from "../../user/interface/IGetUserService";
import { AuthComponents } from "../constants/AuthComponents";
import { ForgotPasswordDTO } from "../dtos/ForgotPasswordDTO";
import { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
import { UpdatePasswordDTO } from "../dtos/UpdatePasswordDTO";
import type { IPasswordService } from "../interfaces/IPasswordService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/auth")
export class PasswordController extends Controller {
	constructor(
		@inject(AuthComponents.PasswordService) private auth: IPasswordService,
		@inject(UserComponents.GetUserService) private user: IGetUserService,
	) {
		super();
	}

	@Post("forgot-password")
	@Middlewares([ValidateBody(ForgotPasswordDTO)])
	async forgotPassword(@Body() email: ForgotPasswordDTO) {
		await this.auth.forgotPasswordRequest(email);

		return ResponseDTO.success({
			message: "password request sent",
		});
	}

	@Post("reset-password")
	@Middlewares([ValidateBody(ResetPasswordDTO)])
	async resetPassword(@Body() payload: ResetPasswordDTO) {
		await this.auth.resetPassword(payload);

		return ResponseDTO.success({
			message: "password reset successfully",
		});
	}

	@Post("update-password")
	@Middlewares([ValidateBody(UpdatePasswordDTO)])
	async updatePassword(@Body() payload: UpdatePasswordDTO) {
		const existingUser = await this.user.findRaw(payload.id);

		if (!existingUser) {
			throw new CustomException("User not found", httpStatus.NOT_FOUND);
		}

		const isOldPasswordCorrect = await decryptPassword(
			payload.oldPassword,
			existingUser.password,
		);
		if (!isOldPasswordCorrect) {
			throw new CustomException(
				"Incorrect Old Password",
				httpStatus.BAD_REQUEST,
			);
		}

		if (payload.oldPassword === payload.newPassword) {
			throw new CustomException(
				"Cannot use your exisitng password",
				httpStatus.BAD_REQUEST,
			);
		}

		await this.auth.updatePassword(payload);
		return ResponseDTO.success({
			message: "password updated successfully",
		});
	}
}
