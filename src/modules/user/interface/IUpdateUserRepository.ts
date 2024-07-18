import type { IUserProfile } from "./IUserProfile";

export interface IUpdateUserRepository {
	disable(userId: number): Promise<void>;
	update(user: Partial<IUserProfile>): Promise<void>;
}
