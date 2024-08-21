import type { IUser } from "./IUser";
import type { IUserProfile } from "./IUserProfile";

export interface IGetUserService {
	findRaw: (id: number) => Promise<IUser | null>;
	find: (
		id?: number,
		email?: string,
	) => Promise<IUserProfile | undefined | null>;
	findByEmail: (email: string) => Promise<IUserProfile | null>;
	findById: (id: number) => Promise<IUserProfile | null>;
	findByGoogleId(googleId: string): Promise<IUser | null>;
	findByFacebookId(facebookId: string): Promise<IUser | null>;
	all: () => Promise<IUserProfile[]>;
}
