import { inject } from "@adonisjs/core";
import { CustomException } from "#exceptions/custom_exception";
import User from "#models/user";
import { UserRepository } from "#repositories/user_repository";
import httpStatus from "http-status";

@inject()
export default class UserService {
	constructor(protected userRepository: UserRepository) { }

	async create(data: Partial<User>): Promise<User> {
		const user = await this.userRepository.create(data);
		return user;
	}

	async delete(userId: number): Promise<void> {
		await this.userRepository.delete(userId);
	}

	async update(userId: number, data: Partial<User>): Promise<User | null> {
		const user = await this.userRepository.update(userId, data);
		return user;
	}

	async getById(id: number): Promise<User | null> {
		const user = await this.userRepository.findById(id);
		if (!user) {
			return null
		}
		return user;
	}

	async getByEmail(id: string): Promise<User | null> {
		const user = await this.userRepository.findByEmail(id);
		if (!user) {
			return null
		}
		return user;
	}

	async changePassword(userId: number, newPassword: string): Promise<User> {
		const user = await this.userRepository.findById(userId);
		if (!user) {
			throw new CustomException(`User with id ${userId} not found`, httpStatus.NOT_FOUND);
		}
		user.password = newPassword;
		await user.save();
		return user;
	}


	async getByAuthProvider(provider: string): Promise<User> {
		return await User.findByOrFail({ provider });
	}

	async getAll(): Promise<User[]> {
		return await User.all();
	}

	async lockUser(
		userId: number,
		reason: string,
		lockingUserId: number,
	): Promise<User | null> {
		const user = this.userRepository.lockUser(userId, reason, lockingUserId);
		return user;
	}

	async unlockUser(userId: number, adminId: number): Promise<User | null> {
		const user = this.userRepository.unlockUser(userId, adminId);
		return user;
	}
}
