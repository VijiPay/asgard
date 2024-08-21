import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthenticatedUser } from "./IAuthenticatedUser";

export interface ILoginService {
	loginWithEmail(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;
	loginWithGoogle(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;
	loginWithFacebook(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;

}
