import { inject, injectable } from "tsyringe";
import { UserComponents } from "../constants/UserComponents";
import type { LoginDTO } from "../dtos/LoginDTO";
import type { ICreateUser } from "../interface/ICreateUser";
import type { ICreateUserRepository } from "../interface/ICreateUserRepository";
import type { ICreateUserService } from "../interface/ICreateUserService";
import type { IUserProfile } from "../interface/IUserProfile";
import type { EncryptPasswordUsecase } from "../use-cases/EncryptPassword.usecase";

@injectable()
export class CreateUserService implements ICreateUserService {
	constructor(
		@inject(UserComponents.CreateUserRepository)
		private user: ICreateUserRepository,
		@inject(UserComponents.EncryptPasswordUsecase)
		private encryptPasswordUsecase: EncryptPasswordUsecase,
	) {}

	async register(data: ICreateUser): Promise<IUserProfile> {
		const encryptedPassword = await this.encryptPasswordUsecase.execute(
			data.password,
		);
		const userData: ICreateUser = {
			...data,
			password: encryptedPassword,
			countryCode: "NG",
			status: 0,
		};
		const user = await this.user.create(userData);
		// Inject welcome email service here if needed
		return user;
	}

	login: (data: LoginDTO) => Promise<{ user: IUserProfile; token: string }>;

	refreshToken: (token: string) => Promise<string>;

	logout: (id: number) => Promise<void>;
}
