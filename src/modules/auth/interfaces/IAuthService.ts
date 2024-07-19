import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthenticatedUser } from "./IAuthenticatedUser";

export interface IAuthService {
	login(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;
	refreshToken(token: string): Promise<string>;
}
