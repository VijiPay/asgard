import type { AuthDTO } from "../dtos/AuthDTO";
import type { IAuthenticatedUser } from "./IAuthenticatedUser";

export interface ILoginService {
	loginWithEmail(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;
	loginWithGmail(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;
	loginWithFacebook(authDTO: AuthDTO): Promise<IAuthenticatedUser | null>;

}
