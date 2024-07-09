import type { IUserProfile } from "./IUserProfile";

export interface IGetUserRepository {
	findByEmail(email: string): Promise<IUserProfile  | null>;
	findById(id: number): Promise<IUserProfile  | null>;
	// findByPhone(id: string): Promise<UserEntity | null>;
	// findByBusinessName(busisnessName: string): Promise<UserEntity | null>;
	// findByInstagramAccount(ig: string): Promise<UserEntity | null>;
}
