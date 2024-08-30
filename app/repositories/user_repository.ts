import type { IUserRepository } from "#interface/i_user_repository";
import User from "#models/user";
import { DateTime } from "luxon";

export class UserRepository implements IUserRepository {
	async create(data: Partial<User>): Promise<User> {
		const {
			email,
			password,
			firstName,
			lastName,
			countryCode,
			googleId,
			facebookId,
			loginIp,
		} = data;
		console.log(data);

		const user = await User.create({
			email,
			password,
			firstName,
			lastName,
			countryCode,
			tradeName: `${firstName} ${lastName}`.trim(),
			emailVerified: !!googleId || !!facebookId,
			role: "user",
			phoneVerified: false,
			googleId: googleId || null,
			facebookId: facebookId || null,
			loginIp: loginIp || null,
			acceptTerms: true,
		});

		return user;
	}

	async findById(id: number): Promise<User | null> {
		return await User.findOrFail(id);
	}

	async findByEmail(email: string): Promise<User | null> {
		return await User.findByOrFail({ email });
	}

	async findByAuthProvider(
		provider: string,
		providerId: string,
	): Promise<User | null> {
		const user = await User.findByOrFail(provider, providerId);
		return user;
	}

	async findAll(): Promise<User[]> {
		return await User.all();
	}

	async update(id: number, data: Partial<User>): Promise<User> {
		const user = await User.findOrFail(id);
		user.merge(data);
		await user.save();
		return user;
	}

	async delete(id: number): Promise<void> {
		const user = await User.findOrFail(id);
		await user.delete();
	}

	async lockUser(
		id: number,
		reason: string,
		lockingUserId: number,
	): Promise<User> {
		const user = await User.findOrFail(id);

		user.userLocked = true;
		user.userLockedMessage = reason;
		user.userLockedDate = DateTime.now();
		user.userLockedBy = String(lockingUserId);

		await user.save();
		return user;
	}

	async unlockUser(id: number): Promise<User> {
		const user = await User.findOrFail(id);

		user.userLocked = false;
		user.userLockedMessage = null;
		user.userLockedDate = null;
		user.userLockedBy = null;

		await user.save();
		return user;
	}
}
