import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import type { IJwtPayload } from "../../../shared/interfaces/IJwtPayload";
import { decryptPassword, generateToken } from "../../../shared/utils/jwt";
import { expiresInHours } from "../../../shared/utils/tokenUtils";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import { AuthComponents } from "../constants/AuthComponents";
import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IAuthenticatedUser } from "../interfaces/IAuthenticatedUser";
import type { ILoginService } from "../interfaces/ILoginService";

@singleton()
export class LoginService implements ILoginService {
	constructor(
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
	) {}

	async loginWithEmail(authDTO: AuthDTO): Promise<IAuthenticatedUser> {
		const user = await this.userRepository.findByEmail(authDTO.email);

		if (!user) {
			throw new CustomException("invalid credentials", httpStatus.NOT_FOUND);
		}
		const decrypt = decryptPassword(authDTO.password, user.password);
		if (!decrypt) {
			throw new CustomException("invalid credentials", httpStatus.UNAUTHORIZED);
		}
		const token = generateToken(user.id, user.email);

		await this.authRepository.saveRefreshToken(
			user.id,
			token,
			expiresInHours(1),
		);
		const authenticatedUser: IAuthenticatedUser = {
			id: user.id,
			type: user.type,
			status: user.status,
			name: user.profile?.tradeName as string,
			countryCode: user.countryCode,
			token,
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
