import type { IUserProfile } from "./IUserProfile";
import type { ICreateUser } from "./ICreateUser";

export interface ICreateUserRepository {
	create: (user: ICreateUser) => Promise<IUserProfile>;
}
