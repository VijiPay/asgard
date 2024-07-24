import { inject, singleton } from "tsyringe";
import { AuthComponents } from "../constants/AuthComponents";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { ITokenService } from "../interfaces/ITokenService";

@singleton()
export class TokenService implements ITokenService {
	constructor(
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
	) {}

	async saveRefreshToken(
		userId: number,
		token: string,
		expiryDate: Date,
	): Promise<void> {
		await this.authRepository.saveRefreshToken(userId, token, expiryDate);
	}

	async getRefreshToken(
		token: string,
	): Promise<{ sessionToken: string; expires: Date } | null> {
		return this.authRepository.getRefreshToken(token);
	}

	async revokeRefreshToken(token: string): Promise<void> {
		await this.authRepository.revokeRefreshToken(token);
	}

	async invalidateUserSessions(userId: number): Promise<void> {
		await this.authRepository.invalidateUserSessions(userId);
	}
}
