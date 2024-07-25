import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { CreateUserDTO } from "../../auth/dtos/CreateUserDTO";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { ILoginService } from "../interfaces/ILoginService";
import type { IRegisterService } from "../interfaces/IRegisterService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/user")
export class RegisterController extends Controller {
	constructor(
		@inject(AuthComponents.RegisterService) private user: IRegisterService,
		@inject(AuthComponents.LoginService) private auth: ILoginService,
	) {
		super();
	}

	@Post("register")
	async register(@Body() payload: CreateUserDTO) {
		const response = await this.user.register(payload);
		if (response) {
			return ResponseDTO.success({
				message: "register",
				data: response,
			});
		}
	}

	@Post("login")
	async login(@Body() payload: AuthDTO) {
		const response = await this.auth.loginWithEmail(payload);
		if (response) {
			return ResponseDTO.success({
				message: "login",
				data: response,
			});
		}
	}
}
