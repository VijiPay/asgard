import type { IUserProfile } from "./IUserProfile";

export interface IGetUserRepository {
	findByEmail(email: string): Promise<IUserProfile | null>;
	findById(id: number): Promise<IUserProfile | null>;
	findAll(): Promise<IUserProfile[]>;
	// findByPhone(id: string): Promise<IUserProfile | null>;
	// findByBusinessName(busisnessName: string): Promise<IUserProfile | null>;
	// findByInstagramAccount(ig: string): Promise<IUserProfile | null>;
}
