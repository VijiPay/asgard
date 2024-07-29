import {
	Body,
	Controller,
	Post,
	Res,
	Route,
	Tags,
	type TsoaResponse,
} from "tsoa";
import { inject, injectable } from "tsyringe";
import { SaveToCookie } from "../../../shared/responses/SaveToCookie";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthenticatedUser } from "../interfaces/IAuthenticatedUser";
import type { ILoginService } from "../interfaces/ILoginService";

@injectable()
@Tags("Authentication")
@Route("ag/v1/user")
export class LoginController extends Controller {
	constructor(
		@inject(AuthComponents.LoginService) private auth: ILoginService,
	) {
		super();
	}

	@Post("login")
	async login(
		@Body() payload: AuthDTO,
		@Res() res: TsoaResponse<
			200,
			{ message: string; data: Partial<IAuthenticatedUser> }
		>,
	) {
		const response = await this.auth.loginWithEmail(payload);
		if (response !== null) {
			const saveToCookie = new SaveToCookie(res);

			saveToCookie.setCookie(
				response,
				{
					httpOnly: true,
					secure: process.env.NODE_ENV === "production", // Send only on HTTPS
					sameSite: "strict",
					maxAge: 15 * 60 * 1000, //15 mins
				},
				{
					httpOnly: true,
					secure: process.env.NODE_ENV === "production", // Send only on HTTPS
					sameSite: "strict",
					maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
				},
			);
		}
	}
}
