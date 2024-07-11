import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { LoginDTO } from "../dtos/LoginDTO";
import type { IAuthService } from "../interface/IAuthService";
import type { ICreateUser } from "../interface/ICreateUser";
import type { IUserProfile } from "../interface/IUserProfile";
import type { CreateUserUsecase } from "../use-cases/CreateUser.usecase";

@injectable()
export class AuthService implements IAuthService {
	constructor(
		@inject(Components.CreateUserUsecase)
		private createUserUsecase: CreateUserUsecase,
	) {}

	async register(data: ICreateUser): Promise<IUserProfile> {
		const res = this.createUserUsecase.execute(data);
		return res;
	}

	login: (data: LoginDTO) => Promise<{ user: IUserProfile; token: string }>;

	refreshToken: (token: string) => Promise<string>;

	logout: (id: number) => Promise<void>;
}
