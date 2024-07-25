import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { decodeToken, generateAccessToken } from "../../../shared/utils/jwt";
import { AuthComponents } from "../constants/AuthComponents";
import type { ITokenRepository } from "../interfaces/ITokenRepository";
import type { ITokenService } from "../interfaces/ITokenService";

@singleton()
export class TokenService implements ITokenService {
	constructor(
		@inject(AuthComponents.TokenRepository)
		private tokenRepository: ITokenRepository,
	) {}

	async refreshAccessToken(
		sessionToken: string,
	): Promise<{ accessToken: string }> {
		if (!sessionToken) {
			throw new CustomException(
				"authorization.required",
				httpStatus.UNAUTHORIZED,
			);
		}
		const decoded = decodeToken(sessionToken);
		const userSession =
			await this.tokenRepository.getSessionToken(sessionToken);
		if (!userSession || userSession.expires.getTime() < Date.now()) {
			throw new CustomException(
				"authorization.required",
				httpStatus.UNAUTHORIZED,
			);
		}
		const newAccessToken = generateAccessToken(decoded.id, decoded.email);
		return { accessToken: newAccessToken };
	}

	async revokeSessionToken(token: string): Promise<void> {
		await this.tokenRepository.revokeRefreshToken(token);
	}

	async invalidateUserSessions(userId: number): Promise<void> {
		await this.tokenRepository.invalidateUserSessions(userId);
	}
}
