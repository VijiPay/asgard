import { inject, injectable } from "tsyringe";
import { Components } from "../../../shared/constants/Components";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { LoginDTO } from "../dtos/LoginDTO";
import type { UserEntity } from "../entities/User.entity";
import type { IAuthService } from "../interface/IAuthService";
import type { CreateUserUsecase } from "../use-cases/CreateUser.usecase";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(Components.CreateUserUsecase)
    private createUserUsecase: CreateUserUsecase,
  ) {}

  async register(data: CreateUserDTO): Promise<UserEntity> {
    return this.createUserUsecase.execute(data);
  }

  login: (data: LoginDTO) => Promise<{ user: UserEntity; token: string }>;

  refreshToken: (token: string) => Promise<string>;

  logout: (id: number) => Promise<void>;
}
