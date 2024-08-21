import type { IUser } from "./IUser";

export interface IGetUserRepository {
		findByEmail(email: string): Promise<IUser | null>;
		findById(id: number): Promise<IUser | null>;
		findAll(): Promise<IUser[]>;
		findByGoogleId(googleId: string): Promise<IUser | null>;
		findByFacebookId(facebookId: string): Promise<IUser | null>;
		// findByPhone(id: string): Promise<IUserProfile | null>;
		// findByBusinessName(busisnessName: string): Promise<IUserProfile | null>;
		// findByInstagramAccount(ig: string): Promise<IUserProfile | null>;
	}
