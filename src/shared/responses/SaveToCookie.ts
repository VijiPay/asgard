import type { CookieOptions } from "express";
import type { TsoaResponse } from "tsoa";
import type { IAuthenticatedUser } from "../../modules/auth/interfaces/IAuthenticatedUser";
import type { ISaveToCookie } from "../interfaces/ISaveToCookie";

export class SaveToCookie implements ISaveToCookie {
	constructor(
		public res: TsoaResponse<
			200,
			{ message: string; data: Partial<IAuthenticatedUser> }
		>,
	) {}

	setCookie(
		data: Partial<IAuthenticatedUser>,
		accessTokenOptions: CookieOptions,
		refreshTokenOptions: CookieOptions,
	) {
		const { accessToken, refreshToken, ...responseData } = data;

		const accessTokenCookie = [
			`accessToken=${accessToken}`,
			"HttpOnly",
			accessTokenOptions.secure ? "Secure" : "",
			"SameSite=Strict",
			`Max-Age=${accessTokenOptions.maxAge}`,
		]
			.filter(Boolean)
			.join("; ");

		const refreshTokenCookie = [
			`refreshToken=${refreshToken}`,
			"HttpOnly",
			refreshTokenOptions.secure ? "Secure" : "",
			"SameSite=Strict",
			`Max-Age=${refreshTokenOptions.maxAge}`,
		]
			.filter(Boolean)
			.join("; ");

		this.res(
			200,
			{
				message: "login.ok",
				data: responseData,
			},
			[
				["Set-Cookie", accessTokenCookie],
				["Set-Cookie", refreshTokenCookie],
			],
		);
	}
}
