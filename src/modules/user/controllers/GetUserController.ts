import type { Request, Response } from "express";
import httpStatus from "http-status";
import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { IUserService } from "../interface/IUserService";

@injectable()
export class GetUserController {
	constructor(
		@inject(Components.UserService) private userService: IUserService,
	) {}

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
