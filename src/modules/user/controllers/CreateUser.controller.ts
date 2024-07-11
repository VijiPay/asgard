import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { IAuthService } from "../interface/IAuthService";

@injectable()
@Tags("User Management")
@Route("ag/v1/users")
export class CreateUserController extends Controller {
	constructor(
		@inject(Components.AuthService) private authService: IAuthService,
	) {
		super();
	}

	@Post("register")
	async register(@Body() payload: CreateUserDTO) {
		const response = await this.authService.register(payload);
		if (response) {
			return ResponseDTO.success({
				message: "successful",
				data: {
					Name: `${response.firstName} ${response.lastName}`,
					Email: response.email,
				},
			});
		}
	}
}
