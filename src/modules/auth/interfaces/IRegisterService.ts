import type { IUserProfile } from "../../user/interface/IUserProfile";
import type { ICreateUser } from "./ICreateUser";

export interface IRegisterService {
	register: (data: ICreateUser) => Promise<IUserProfile>;
}
