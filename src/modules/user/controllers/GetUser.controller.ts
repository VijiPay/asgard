import httpStatus from "http-status";
import { Controller, Get, Query, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { IUserService } from "../interface/IUserService";

@injectable()
@Tags("User Management")
@Route("ag/v1/users")
export class GetUserController extends Controller {
	constructor(
		@inject(Components.UserService)
		private readonly userService: IUserService,
	) {
		super();
	}

	@Get("find")
	async getUser(@Query() id?: number, @Query() email?: string) {
		if (!id && !email) {
			throw new CustomException(
				"user id or email is required",
				httpStatus.FORBIDDEN,
			);
		}
		const user = await this.userService.find(id, email);
		if (user) {
			return ResponseDTO.success({
				message: "user profile fetched successfully",
				data: user,
			});
		}
		throw new CustomException("user not found", httpStatus.NOT_FOUND);
	}

	@Get("find-by-id")
	async getUserById(@Query() id: number) {
		const user = await this.userService.findById(id);
		if (user) {
			return ResponseDTO.success({
				message: "user profile fetched successfully",
				data: user,
			});
		}
		throw new CustomException("User Not Found", httpStatus.NOT_FOUND);
	}

	@Get("find-by-email")
	async getUserByEmail(@Query() email: string) {
		const user = await this.userService.findByEmail(email);
		if (user) {
			return ResponseDTO.success({
				message: "user profile fetched successfully",
				data: user,
			});
		}
		throw new CustomException("User Not Found", httpStatus.NOT_FOUND);
	}

	@Get("all")
	async getAllUsers() {
		const users = await this.userService.all();
		return ResponseDTO.success({
			message: "users fetched successfully",
			data: users,
		});
	}
}
