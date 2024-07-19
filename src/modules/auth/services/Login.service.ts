import { inject, singleton } from "tsyringe";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IAuthService } from "../interfaces/IAuthService";
import type { IAuthenticatedUser } from "../interfaces/IAuthenticatedUser";

@singleton()
export class AuthService implements IAuthService {
	constructor(
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
	) {}

	login(authDTO: AuthDTO): Promise<IAuthenticatedUser | null> {
		return this.authRepository.login(authDTO);
	}

	refreshToken(token: string): Promise<string> {
		return this.authRepository.refreshToken(token);
	}
}
