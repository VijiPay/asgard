import { inject, singleton } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { ICreateUser } from "../interface/ICreateUser";
import type { IUserProfile } from "../interface/IUserProfile";
import type { CreateUserRepository } from "../repositories/CreateUser.repository";
import type { EncryptPasswordUsecase } from "./EncryptPassword.usecase";

@singleton()
export class CreateUserUsecase {
	constructor(
		@inject(Components.EncryptPasswordUsecase)
		private encryptPasswordUsecase: EncryptPasswordUsecase,
		@inject(Components.CreateUserRepository)
		private userRepository: CreateUserRepository,
	) {}

	async execute(data: ICreateUser): Promise<IUserProfile> {
		const encryptedPassword = await this.encryptPasswordUsecase.execute(
			data.password,
		);
		const userData: ICreateUser = {
			...data,
			password: encryptedPassword,
			countryCode: "NG",
			status: 0,
		};
		const user = await this.userRepository.create(userData);
		// Inject welcome email service here if needed
		return user;
	}
}
