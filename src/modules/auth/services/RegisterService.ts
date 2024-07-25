import httpStatus from "http-status";
import { inject, singleton } from "tsyringe";
import { CustomException } from "../../../shared/exceptions/CustomException";
import { encryptPassword } from "../../../shared/utils/jwt";
import { UserComponents } from "../../user/constants/UserComponents";
import type { IGetUserRepository } from "../../user/interface/IGetUserRepository";
import { AuthComponents } from "../constants/AuthComponents";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { ICreateUser } from "../interfaces/ICreateUser";
import type { IRegisterRepository } from "../interfaces/IRegisterRepository";
import type { IRegisterService } from "../interfaces/IRegisterService";

@singleton()
export class RegisterService implements IRegisterService {
	constructor(
		@inject(AuthComponents.RegisterRepository)
		private registerRepository: IRegisterRepository,
		@inject(UserComponents.GetUserRepository)
		private userRepository: IGetUserRepository,
	) {}

	async register(
		data: CreateUserDTO,
	): Promise<{ name: string; email: string }> {
		const userExists = await this.userRepository.findByEmail(data.email);
		if (userExists) {
			throw new CustomException("user.already.exists", httpStatus.FORBIDDEN);
		}

		const encryptedPassword = await encryptPassword(data.password);
		const userData: ICreateUser = {
			...data,
			password: encryptedPassword,
			profile: {
				create: {
					tradeName: `${data.firstName} ${data.lastName}`,
				},
			},
		};

		const user = await this.registerRepository.create(userData);
		return { name: user.firstName, email: user.email };
	}
}
