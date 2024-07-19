import { Body, Controller, Post, Request, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import type { AuthenticatedRequest } from "../../../shared/interfaces/AuthenticatedRequest";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthService } from "../interfaces/IAuthService";
import type { IAuthenticatedUser } from "../interfaces/IAuthenticatedUser";

@injectable()
@Tags("Authentication")
@Route("auth")
export class AuthController extends Controller {
	constructor(
		@inject(AuthComponents.AuthService) private authService: IAuthService,
	) {
		super();
	}

	@Post("login")
	async login(
		@Body() body: AuthDTO,
		@Request() req: AuthenticatedRequest,
	): Promise<ResponseDTO<IAuthenticatedUser | null>> {
		const data = await this.authService.login(body);
		return ResponseDTO.success({ message: "login.correct", data });
	}

	@Post("refreshtoken")
	async refreshToken(
		@Body() token: string,
		@Request() req: AuthenticatedRequest,
	): Promise<ResponseDTO<string>> {
		const refreshToken = await this.authService.refreshToken(token);
		return ResponseDTO.success({
			message: "refresh.token",
			data: refreshToken,
		});
	}
}
