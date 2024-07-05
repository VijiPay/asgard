import type { CreateUserDTO } from "../dtos/CreateUserDTO";
import type { LoginDTO } from "../dtos/LoginDTO";
import type { UserEntity } from "../entities/User.entity";

export interface IAuthService {
  register: (data: CreateUserDTO) => Promise<UserEntity>;
  login: (data: LoginDTO) => Promise<{ user: UserEntity; token: string }>;
  refreshToken: (token: string) => Promise<string>;
  logout: (id: number) => Promise<void>;
}
