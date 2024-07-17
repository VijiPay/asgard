import httpStatus from "http-status";
import { Controller, Get, Query, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { UserComponents } from "../constants/UserComponents";
import type { IGetUserService } from "../interface/IGetUserService";

@injectable()
@Tags("User Management")
@Route("ag/v1/user")
export class GetUserController extends Controller {
	constructor(
		@inject(UserComponents.GetUserService)
		private userService: IGetUserService,
	) {
		super();
	}

	@Get("find")
	async getUser(@Query() id?: number, @Query() email?: string) {
		if (!id && !email) {
			throw new CustomException("idOrEmail.required", httpStatus.FORBIDDEN);
		}
		const user = await this.userService.find(id, email);
		if (user) {
			return ResponseDTO.success({
				message: "user.profile",
				data: user,
			});
		}
		throw new CustomException("user.notFound", httpStatus.NOT_FOUND);
	}

	@Get("find-by-id")
	async getUserById(@Query() id: number) {
		const user = await this.userService.findById(id);
		if (user) {
			return ResponseDTO.success({
				message: "user.profile",
				data: user,
			});
		}
		throw new CustomException("user.notFound", httpStatus.NOT_FOUND);
	}

	@Get("find-by-email")
	async getUserByEmail(@Query() email: string) {
		const user = await this.userService.findByEmail(email);
		if (user) {
			return ResponseDTO.success({
				message: "user.profile",
				data: user,
			});
		}
		throw new CustomException("user.notFound", httpStatus.NOT_FOUND);
	}

	@Get("all")
	async getAllUsers() {
		const users = await this.userService.all();
		return ResponseDTO.success({
			message: "users.profiles",
			data: users,
		});
	}
}
