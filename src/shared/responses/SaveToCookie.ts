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
			`SameSite=${accessTokenOptions.sameSite || "Strict"}`,
			`Max-Age=${accessTokenOptions.maxAge}`,
			accessTokenOptions.domain ? `Domain=${accessTokenOptions.domain}` : "",
			accessTokenOptions.path ? `Path=${accessTokenOptions.path}` : "",
		]
			.filter(Boolean)
			.join("; ");

		const refreshTokenCookie = [
			`refreshToken=${refreshToken}`,
			"HttpOnly",
			refreshTokenOptions.secure ? "Secure" : "",
			`SameSite=${refreshTokenOptions.sameSite || "Strict"}`,
			`Max-Age=${refreshTokenOptions.maxAge}`,
			refreshTokenOptions.domain ? `Domain=${refreshTokenOptions.domain}` : "",
			refreshTokenOptions.path ? `Path=${refreshTokenOptions.path}` : "",
		]
			.filter(Boolean)
			.join("; ");

		this.res(
			200,
			{
				message: "login.ok",
				data: responseData,
			},
			{
				"Set-Cookie": [accessTokenCookie, refreshTokenCookie],
			},
		);
	}
}
