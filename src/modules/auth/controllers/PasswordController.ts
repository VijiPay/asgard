import { validateOrReject } from "class-validator";
import { Body, Controller, Middlewares, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { ValidateBody } from "../../../shared/middleware/ValidateBody";
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
		await validateOrReject(payload);
		await this.auth.resetPassword(payload);

		return ResponseDTO.success({
			message: "password reset successfully",
		});
	}

	@Post("update-password")
	@Middlewares([ValidateBody(UpdatePasswordDTO)])
	async updatePassword(@Body() payload: UpdatePasswordDTO) {
		await validateOrReject(payload);
		await this.auth.updatePassword(payload);
		return ResponseDTO.success({
			message: "password updated successfully",
		});
	}
}
