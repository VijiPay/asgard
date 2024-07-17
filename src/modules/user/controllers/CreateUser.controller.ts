import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { UserComponents } from "../constants/UserComponents";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { ICreateUserService } from "../interface/ICreateUserService";

@injectable()
@Tags("User Management")
@Route("ag/v1/users")
export class CreateUserController extends Controller {
	constructor(
		@inject(UserComponents.CreateUserService) private user: ICreateUserService,
	) {
		super();
	}

	@Post("register")
	async register(@Body() payload: CreateUserDTO) {
		const response = await this.user.register(payload);
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
