import type User from "#models/user";
import type {
	CreateUserData,
	IUserService,
	UpdateUserData,
} from "../../types/i_user_service.js";

export abstract class AbstractUserService implements IUserService {
	abstract create(data: CreateUserData): Promise<User>;
	abstract delete(userId: number): Promise<void>;
	abstract update(userId: number, data: UpdateUserData): Promise<User>;
	abstract changePassword(userId: number, newPassword: string): Promise<User>;
	abstract getById(userId: number): Promise<User>;
	abstract getByEmail(email: string): Promise<User>;
	abstract getByAuthProvider(provider: string): Promise<User>;
	abstract getAll(): Promise<User[]>;
	abstract lockUser(
		userId: number,
		reason: string,
		lockingUserId: number,
	): Promise<User>;
	abstract unlockUser(userId: number): Promise<User>;
}
