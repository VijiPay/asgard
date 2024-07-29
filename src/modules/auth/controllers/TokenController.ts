import { Body, Controller, Post, Route, Tags } from "tsoa";
import { inject, injectable } from "tsyringe";
import { ResponseDTO } from "../../../shared/dtos/ResponseDTO";
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
}
