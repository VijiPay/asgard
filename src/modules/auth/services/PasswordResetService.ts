import { inject, singleton } from "tsyringe";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import { AuthComponents } from "../constants/AuthComponents";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import type { IPasswordResetService } from "../interfaces/IPasswordResetService";

@singleton()
export class PasswordResetService implements IPasswordResetService {
	constructor(
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
		@inject(AuthComponents.AuthRepository)
		private authRepository: IAuthRepository,
	) {}
	async createPasswordResetRequest(
		id: number,
		token: string,
		tokenExpiry: Date,
	): Promise<void> {
		await this.authRepository.createPasswordResetRequest(
			id,
			token,
			tokenExpiry,
		);
	}
	verifyPasswordResetToken(
		token: string,
	): Promise<{
		token: string | null;
		resetRequired: boolean | null;
		expiry: Date | null;
	}> {
		return this.authRepository.verifyPasswordResetToken(token);
	}
	// async refreshToken(token: string): Promise<string> {
	// 	const decoded: IJwtPayload = decodeToken(token);
	// 	const user = await this.userRepository.findById(decoded.id);

	// 	if (!user) {
	// 		throw new CustomException("user.notFound", httpStatus.NOT_FOUND);
	// 	}

	// 	return generateToken(user.id, user.email);
	// }
}
