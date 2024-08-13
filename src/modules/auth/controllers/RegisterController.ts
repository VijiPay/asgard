import { validateOrReject } from "class-validator";
import { Body, Controller, Middlewares, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { ValidateBody } from "../../../shared/middleware/ValidateBody";
import { CreateUserDTO } from "../../auth/dtos/CreateUserDTO";
import { AuthComponents } from "../constants/AuthComponents";
import type { IRegisterService } from "../interfaces/IRegisterService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/auth")
export class RegisterController extends Controller {
	constructor(
		@inject(AuthComponents.RegisterService) private user: IRegisterService,
	) {
		super();
	}

	@Post("register")
	@Middlewares([ValidateBody(CreateUserDTO)])
	async register(@Body() payload: CreateUserDTO) {
		validateOrReject(payload);
		const response = await this.user.register(payload);
		if (response) {
			return ResponseDTO.success({
				message: "registered",
				data: response,
			});
		}
	}
}
