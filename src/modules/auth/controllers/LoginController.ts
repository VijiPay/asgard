import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { ILoginService } from "../interfaces/ILoginService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/user")
export class LoginController extends Controller {
	constructor(
		@inject(AuthComponents.LoginService) private auth: ILoginService,
	) {
		super();
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
