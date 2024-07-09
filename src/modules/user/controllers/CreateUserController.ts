import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { IAuthService } from "../interface/IAuthService";

@injectable()
export class CreateUserController {
	constructor(
		@inject(Components.AuthService) private authService: IAuthService,
	) {}

	async register(req: Request, res: Response): Promise<ResponseDTO> {
		const userData: CreateUserDTO = req.body;
		await this.authService.register(userData);
		return ResponseDTO.success({ message: "successful" });
	}
}
