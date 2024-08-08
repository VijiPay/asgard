import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { AuthComponents } from "../constants/AuthComponents";
import type { ResetPasswordDTO } from "../dtos/ResetPasswordDTO";
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
		const response = await this.auth.forgotPasswordRequest(payload);

		return ResponseDTO.success({
			message: "register",
			data: response,
		});
	}

	@Post("reset-password")
	async resetPassword(@Body() payload: ResetPasswordDTO) {
		const response = await this.auth.resetPassword(payload);

		return ResponseDTO.success({
			message: "register",
			data: response,
		});
	}

	@Post("update-password")
	async updatePassword(@Body() payload: string) {
		const response = await this.auth.forgotPasswordRequest(payload);

		return ResponseDTO.success({
			message: "register",
			data: response,
		});
	}
}
