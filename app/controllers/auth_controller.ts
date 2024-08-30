import type { AuthService } from "#services/auth_service";
import ResponseDTO from "#shared/dtos/response_dto";
import { CustomException } from "#shared/exceptions/CustomException";
import { loginValidator, registerValidator } from "#validators/auth";
import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";

@inject()
export default class AuthController {
	constructor(private authService: AuthService) {}

	async register({ request, response }: HttpContext) {
		const payload = await request.validateUsing(registerValidator);
		const user = await this.authService.register(payload);
		return response
			.status(201)
			.json(ResponseDTO.created("User registered successfully.", user));
	}

	async login({ request }: HttpContext) {
		const { email, password } = await request.validateUsing(loginValidator);

		const user = await this.authService.login(email, password);
		const token = await this.authService.createToken(user);
		return ResponseDTO.success("Logged in successfully", {
			...user.serialize(),
			token,
		});
	}

	async logout({ auth }: HttpContext) {
		const user = auth.getUserOrFail();
		const token = auth.use("api").user?.currentAccessToken.identifier;
		if (!token) {
			throw new CustomException("Token not found", 404);
		}
		this.authService.deleteAccessToken(user, token as string);
		return ResponseDTO.success("Logged Out!");
	}
}
