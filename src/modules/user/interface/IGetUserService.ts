import type { IUserProfile } from "./IUserProfile";

export interface IGetUserService {
	find: (
		id?: number,
		email?: string,
	) => Promise<IUserProfile | undefined | null>;
	findByEmail: (email: string) => Promise<IUserProfile | null>;
	findById: (id: number) => Promise<IUserProfile | null>;
	all: () => Promise<IUserProfile[]>;
}
