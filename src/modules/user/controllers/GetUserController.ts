import type { Request, Response } from "express";
import httpStatus from "http-status";
import { Controller, Get, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { IUserService } from "../interface/IUserService";

@injectable()
@Tags("User Management")
@Route("api/v1/users")
export class GetUserController extends Controller {
	constructor(
		@inject(Components.UserService) private readonly userService: IUserService,
	) {
		super();
	}

	@Get("find")
	async getUser(req: Request, res: Response) {
		const { id, email } = req.query;
		const user = await this.userService.find(Number(id), String(email));
		if (user) {
			return ResponseDTO.success({
				message: "user profile fetched successfully",
				data: user,
			});
		}
		throw new CustomException("User Not Found", httpStatus.NOT_FOUND);
	}

	@Get("find-by-id")
	async getUserById(req: Request, res: Response) {
		const { id } = req.query;
		const user = await this.userService.findById(Number(id));
		if (user) {
			return ResponseDTO.success({
				message: "user profile fetched successfully",
				data: user,
			});
		}
		throw new CustomException("User Not Found", httpStatus.NOT_FOUND);
	}
	@Get("find-by-email")
	async getUserByEmail(req: Request, res: Response) {
		const { email } = req.query;
		const user = await this.userService.findByEmail(String(email));
		if (user) {
			return ResponseDTO.success({
				message: "user profile fetched successfully",
				data: user,
			});
		}
		throw new CustomException("User Not Found", httpStatus.NOT_FOUND);
	}
}
