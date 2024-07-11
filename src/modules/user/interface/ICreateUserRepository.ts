import type { ICreateUser } from "./ICreateUser";
import type { IUserProfile } from "./IUserProfile";

export interface ICreateUserRepository {
	create: (user: ICreateUser) => Promise<IUserProfile>;
}
