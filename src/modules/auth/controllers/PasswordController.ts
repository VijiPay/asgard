import { validateOrReject } from "class-validator";
import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { AuthComponents } from "../constants/AuthComponents";
import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
import type { UpdatePasswordDTO } from "../dtos/UpdatePasswordDTO";
import type { IPasswordService } from "../interfaces/IPasswordService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/auth")
export class RegisterController extends Controller {
	constructor(
		@inject(AuthComponents.PasswordService) private auth: IPasswordService,
	) {
		super();
	}

	@Post("forgot-password")
	async forgotPassword(@Body() payload: string) {
		await this.auth.forgotPasswordRequest(payload);

		return ResponseDTO.success({
			message: "password request sent",
		});
	}

	@Post("reset-password")
	async resetPassword(@Body() payload: ResetPasswordDTO) {
		await validateOrReject(payload);
		await this.auth.resetPassword(payload);

		return ResponseDTO.success({
			message: "password reset successfully",
		});
	}

	@Post("update-password")
	async updatePassword(@Body() payload: UpdatePasswordDTO) {
		await validateOrReject(payload);
		await this.auth.updatePassword(payload);
		return ResponseDTO.success({
			message: "password updated successfully",
		});
	}
}
