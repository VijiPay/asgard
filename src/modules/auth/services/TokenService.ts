import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { ILogger } from "../../../shared/services/logger/ILogger";
import { decodeToken, generateAccessToken } from "../../../shared/utils/jwt";
import { AuthComponents } from "../constants/AuthComponents";
import type { ITokenRepository } from "../interfaces/ITokenRepository";
import type { ITokenService } from "../interfaces/ITokenService";

@singleton()
export class TokenService implements ITokenService {
	constructor(
		@inject(AuthComponents.TokenRepository)
		private tokenRepository: ITokenRepository,
		@inject(Components.Logger)
		public logger: ILogger,
	) {}

	async refreshAccessToken(
		refreshToken: string,
	): Promise<{ accessToken: string }> {
		this.logger.info("the session token", refreshToken);
		if (!refreshToken) {
			throw new CustomException(
				"authorization.required",
				httpStatus.UNAUTHORIZED,
			);
		}
		const decoded = decodeToken(refreshToken);
		const userSession =
			await this.tokenRepository.getRefreshToken(refreshToken);
		if (!userSession || userSession.expires.getTime() < Date.now()) {
			throw new CustomException(
				"authorization.required",
				httpStatus.UNAUTHORIZED,
			);
		}
		const newAccessToken = generateAccessToken(decoded.id, decoded.email);
		return { accessToken: newAccessToken };
	}

	async getSession(
		token: string,
	): Promise<{ refreshToken: string; sessionId: number } | null> {
		const session = await this.tokenRepository.getRefreshToken(token);

		if (!session) {
			throw new CustomException("Session not found", httpStatus.NOT_FOUND);
		}
		return { refreshToken: session.refreshToken, sessionId: session.id };
	}

	async revokeRefreshToken(tokenId: number): Promise<void> {
		await this.tokenRepository.revokeRefreshToken(tokenId);
	}

	async invalidateUserSessions(userId: number): Promise<void> {
		await this.tokenRepository.invalidateUserSessions(userId);
	}
}
