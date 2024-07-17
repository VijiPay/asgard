import type { LoginDTO } from "../dtos/LoginDTO";
import type { ICreateUser } from "./ICreateUser";
import type { IUserProfile } from "./IUserProfile";

export interface ICreateUserService {
	register: (data: ICreateUser) => Promise<IUserProfile>;
	login: (data: LoginDTO) => Promise<{ user: IUserProfile; token: string }>;
	refreshToken: (token: string) => Promise<string>;
	logout: (id: number) => Promise<void>;
}
