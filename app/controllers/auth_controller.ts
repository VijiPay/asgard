import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import { AuthService } from "#services/auth_service";
import ResponseDTO from "#shared/dtos/response_dto";
import { loginValidator } from "#validators/auth";
import { CustomException } from "#exceptions/custom_exception";
import httpStatus from "http-status";

@inject()
export default class AuthController {
	constructor(protected authService: AuthService) {}

	async login({ request }: HttpContext) {
		const { email, password } = await request.validateUsing(loginValidator);

		const user = await this.authService.login(email, password);
		const token = await this.authService.createToken(user);
		return ResponseDTO.success("Logged in successfully",
			{
				...user.serialize(),
				token,
			},
		);
	}

	async platform({ ally, params }: HttpContext) {
		const driverInstance = ally.use(params.platform);
		driverInstance.redirect();
	}

	async platformCallback({ ally, params }: HttpContext) {
		const platform = ally.use(params.platform);
		if (platform.accessDenied()) {
			return "You have cancelled the login process";
		}
		if (platform.stateMisMatch()) {
			return "We are unable to verify the request. Please try again";
		}
		if (platform.hasError()) {
			return platform.getError();
		}
		const user = await platform.user();
		return user;
	}

	async logout({ auth }: HttpContext) {
		const user = auth.getUserOrFail();
		const token = auth.use("api").user?.currentAccessToken.identifier;
		if (!token) {
			throw new CustomException("Token not found", httpStatus.NOT_FOUND);
		}
		this.authService.deleteAccessToken(user, token as string);
		return ResponseDTO.success("Logged Out!");
	}
}
