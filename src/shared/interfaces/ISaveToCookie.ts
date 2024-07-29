import type { CookieOptions } from "express";
import type { TsoaResponse } from "tsoa";
import type { IAuthenticatedUser } from "../../modules/auth/interfaces/IAuthenticatedUser";

export interface ISaveToCookie {
	res: TsoaResponse<
		200,
		{ message: string; data: Partial<IAuthenticatedUser> }
	>;
	setCookie(
		data: Partial<IAuthenticatedUser>,
		accessTokenOptions: CookieOptions,
		refreshTokenOptions: CookieOptions,
	): void;
}
