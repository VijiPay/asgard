import { inject } from "@adonisjs/core";
import { DateTime } from "luxon";
import User from "#models/user";

@inject()
export class UserRepository {
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
			role,
		} = data;

		const user = await User.create({
			email,
			password,
			firstName,
			lastName,
			countryCode,
			tradeName: `${firstName} ${lastName}`.trim(),
			emailVerified: !!googleId || !!facebookId,
			role,
			phoneVerified: false,
			googleId: googleId || null,
			facebookId: facebookId || null,
			loginIp: loginIp || null,
			acceptTerms: true,
		});

		return user;
	}

	async findById(id: number): Promise<User | null> {
		return await User.find(id);
	}

	async findByEmail(email: string): Promise<User | null> {
		return await User.findBy({ email });
	}

	async findByAuthProvider(
		provider: string,
		providerId: string,
	): Promise<User | null> {
		const user = await User.findBy(provider, providerId);
		return user;
	}

	async findAll(): Promise<User[]> {
		return await User.all();
	}

	async update(id: number, data: Partial<User>): Promise<User | null> {
		const user = await User.find(id);
		if(user){
		user.merge(data);
		await user.save();
		}
		return user;
	}

	async delete(id: number): Promise<void> {
		const user = await User.find(id);
		if(user)
		await user.delete();
	}

	async lockUser(
		id: number,
		reason: string,
		lockingUserId: number,
	): Promise<User | null> {
		const user = await User.find(id);
		if(user){
		user.userLocked = true;
		user.userLockedMessage = reason;
		user.userLockedDate = DateTime.now();
		user.userLockedBy = String(lockingUserId);

		await user.save();
		}
		return user;
	}

	async unlockUser(id: number, unlockingUserId: number): Promise<User | null> {
		const user = await User.find(id);
		if(user) {
		user.userLocked = false;
		user.userLockedMessage = null;
		user.userLockedDate = null;
		user.userLockedBy = String(unlockingUserId);

		await user.save();
		}
		return user;
	}
}
