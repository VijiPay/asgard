import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import type { AuthService } from "#services/auth_service";
import ResponseDTO from "#shared/dtos/response_dto";
import { CustomException } from "#shared/exceptions/CustomException";
import { loginValidator, registerValidator } from "#validators/auth";

@inject()
export default class AuthController {
	constructor(private authService: AuthService) {}

	async register({ request }: HttpContext) {
		const payload = await request.validateUsing(registerValidator);
		const user = await this.authService.register(payload);
		return ResponseDTO.success({
			message: "User registered successfully.",
			data: user,
		});
	}

	async login({ request }: HttpContext) {
		const { email, password } = await request.validateUsing(loginValidator);

		const user = await this.authService.login(email, password);
		const token = await this.authService.createToken(user);
		return ResponseDTO.success({
			message: "Logged in successfully",
			data: {
				...user.serialize(),
				token,
			},
		});
	}

	async logout({ auth }: HttpContext) {
		const user = auth.getUserOrFail();
		const token = auth.use("api").user?.currentAccessToken.identifier;
		if (!token) {
			throw new CustomException("Token not found", 404);
		}
		this.authService.deleteAccessToken(user, token as string);
		return ResponseDTO.success({ message: "Logged Out!" });
	}
}
