import type { IUserProfile } from "../../user/interface/IUserProfile";
import type { ICreateUser } from "./ICreateUser";

export interface IRegisterUserRepository {
	create: (user: ICreateUser) => Promise<IUserProfile>;
}
