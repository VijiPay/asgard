import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { encryptPassword } from "../../../shared/utils/jwt";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import type { IUserProfile } from "../../user/interface/IUserProfile";
import { AuthComponents } from "../constants/AuthComponents";
import type { ICreateUser } from "../interfaces/ICreateUser";
import type { IRegisterService } from "../interfaces/IRegisterService.ts";
import type { IRegisterUserRepository } from "../interfaces/IRegisterUserRepository";

@singleton()
export class RegisterUserService implements IRegisterService {
	constructor(
		@inject(AuthComponents.AuthRepository)
		private registerUserRepository: IRegisterUserRepository,
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
	) {}

	async register(data: ICreateUser): Promise<IUserProfile> {
		const userExists = await this.userRepository.findByEmail(data.email);
		if (userExists) {
			throw new CustomException("user.already.exists", httpStatus.FORBIDDEN);
		}
		const encryptedPassword = await encryptPassword(data.password);
		const userData: ICreateUser = {
			...data,
			password: encryptedPassword,
			countryCode: "NG",
			status: 0,
		};
		const user = await this.registerUserRepository.create(userData);
		return user;
	}
}
