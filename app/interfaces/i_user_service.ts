import type User from "#models/user";

export interface CreateUserData {
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
	countryCode?: string;
	googleId?: string;
	facebookId?: string;
	loginIp?: string;
}

export interface UpdateUserData {
	email?: string;
	firstName?: string;
	lastName?: string;
	countryCode?: string;
}

export interface IUserService {
	create(data: CreateUserData): Promise<User>;
	delete(userId: number): Promise<void>;
	update(userId: number, data: UpdateUserData): Promise<User>;
	changePassword(userId: number, newPassword: string): Promise<User>;
	getById(userId: number): Promise<User>;
	getByEmail(email: string): Promise<User>;
	getByAuthProvider(provider: string): Promise<User>;
	getAll(): Promise<User[]>;
	lockUser(
		userId: number,
		reason: string,
		lockingUserId: number,
	): Promise<User>;
	unlockUser(userId: number): Promise<User>;
}
