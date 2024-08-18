import type { Request as ExpressRequest } from "express";
import httpStatus from "http-status";
import { Body, Controller, Get, Post, Request, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { AuthComponents } from "../constants/AuthComponents";
import type { ITokenService } from "../interfaces/ITokenService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/token")
export class TokenController extends Controller {
	constructor(
		@inject(AuthComponents.TokenService) private token: ITokenService,
	) {
		super();
	}

	@Post("refresh-token")
	async refreshSessionToken(@Body() payload: string) {
		const response = await this.token.refreshAccessToken(payload);
		if (response) {
			return ResponseDTO.success({
				message: "token.refreshed",
				data: { response },
			});
		}
	}
	@Get("logout")
	async logout(@Request() req: ExpressRequest) {
		const refreshToken: string = req.cookies.refreshToken;
		console.log(refreshToken);
		if (!refreshToken) {
			throw new CustomException(
				"No refresh token found",
				httpStatus.BAD_REQUEST,
			);
		}
		const session = await this.token.getSession(refreshToken);
		if (session) {
			await this.token.revokeRefreshToken(session.sessionId);
		}

		req.res?.clearCookie("accessToken");
		req.res?.clearCookie("refreshToken");

		return ResponseDTO.success({
			message: "Logged out!",
		});
	}
}
