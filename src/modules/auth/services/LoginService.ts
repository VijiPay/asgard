import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import {
	decryptPassword,
	generateAccessToken,
	generateSessionToken,
} from "../../../shared/utils/jwt";
import { expiresInHours } from "../../../shared/utils/tokenUtils";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthenticatedUser } from "../interfaces/IAuthenticatedUser";
import type { ILoginService } from "../interfaces/ILoginService";
import type { ITokenRepository } from "../interfaces/ITokenRepository";

@singleton()
export class LoginService implements ILoginService {
	constructor(
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
		@inject(AuthComponents.TokenRepository)
		private tokenRepository: ITokenRepository,
	) {}

	async loginWithEmail(authDTO: AuthDTO): Promise<IAuthenticatedUser> {
		const user = await this.userRepository.findByEmail(authDTO.email);
		if (!user) {
			throw new CustomException("invalid.credentials", httpStatus.NOT_FOUND);
		}
		const decrypt = await decryptPassword(authDTO.password, user.password);
		if (!decrypt) {
			throw new CustomException("invalid.credentials", httpStatus.UNAUTHORIZED);
		}
		const accessToken = generateAccessToken(user.id, user.email);
		const sessionToken = generateSessionToken(user.id);
		await this.tokenRepository.saveSessionToken(
			user.id,
			accessToken,
			generateSessionToken(user.id),
			expiresInHours(1),
		);
		const authenticatedUser: IAuthenticatedUser = {
			id: user.id,
			type: user.type,
			status: user.status,
			name: user.profile?.tradeName as string,
			countryCode: user.countryCode,
			accessToken,
			sessionToken,
		};
		return authenticatedUser;
	}

	loginWithGmail(authDTO: AuthDTO): Promise<IAuthenticatedUser | null> {
		return Promise.resolve(null);
	}

	loginWithFacebook(authDTO: AuthDTO): Promise<IAuthenticatedUser | null> {
		return Promise.resolve(null);
	}
}
