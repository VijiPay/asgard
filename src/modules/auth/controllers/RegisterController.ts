import {
	Body,
	Controller,
	Get,
	Middlewares,
	Patch,
	Path,
	Post,
	Route,
	Tags,
} from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { ValidateBody } from "../../../shared/middleware/ValidateBody";
import { CreateUserDTO } from "../../auth/dtos/CreateUserDTO";
import { AuthComponents } from "../constants/AuthComponents";
import type { IEmailVerification } from "../interfaces/IEmailVerification";
import type { IRegisterService } from "../interfaces/IRegisterService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/auth")
export class RegisterController extends Controller {
	constructor(
		@inject(AuthComponents.RegisterService) private user: IRegisterService,
		@inject(AuthComponents.EmailVerification)
		private email: IEmailVerification,
	) {
		super();
	}

	@Post("register")
	@Middlewares([ValidateBody(CreateUserDTO)])
	async register(@Body() payload: CreateUserDTO) {
		const response = await this.user.register(payload);
		if (response) {
			return ResponseDTO.success({
				message: "registered",
				data: response,
			});
		}
	}

	@Patch("email/verify")
	async sendEmailVerificationCode(@Body() payload: { email: string }) {
		await this.email.sendEmailVerificationCode(payload.email);
		return ResponseDTO.success({
			message: "Verification code sent",
		});
	}

	@Get("email/verify/{code}")
	async verifyEmail(@Path() code: string) {
		await this.email.verifyEmail(code);
		return ResponseDTO.success({
			message: "Email verified successfully",
		});
	}
}
