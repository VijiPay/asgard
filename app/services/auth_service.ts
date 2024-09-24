// import Mail from '@adonisjs/mail/services/main'
// import Env from '@adonisjs/core/services/env'
import { inject } from "@adonisjs/core";
import Hash from "@adonisjs/core/services/hash";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import User from "#models/user";
import type { UserRepository } from "#repositories/user_repository";
import { CustomException } from "#shared/exceptions/custom_exception";

@inject()
export class AuthService {
	constructor(private userRepository: UserRepository) {}

	async register(data: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
		countryCode?: string;
	}): Promise<User> {
		const user = await this.userRepository.create({
			...data,
			emailVerifyCode: uuidv4(),
			emailVerifyExpires: DateTime.now().plus({ hours: 24 }),
		});

		// await this.sendVerificationEmail(user)

		return user;
	}

	async login(email: string, password: string): Promise<User> {
		const user = await User.findBy("email", email);
		if (!user) {
			throw new CustomException("Invalid credentials", 401);
		}

		if (user.password === null) {
			const provider = user.googleId
				? "Google"
				: user.facebookId
					? "Facebook"
					: "Google / Facebook";
			throw new CustomException(
				`Please login with ${provider} or reset your password`,
				403,
			);
		}

		if (user.userLocked) {
			throw new CustomException("Account locked contact support!", 403);
		}

		user.lastLogin = DateTime.now();
		await user.save();

		const res = await User.verifyCredentials(email, password);

		return res;
	}

	async createToken(user: User) {
		const token = await User.accessTokens.create(user);
		return token;
	}

	async deleteAccessToken(user: User, token: string) {
		const res = await User.accessTokens.delete(user, token);
		return res;
	}

	async logout(user: User, token: unknown): Promise<void> {
		await User.accessTokens.delete(user, token as string);
	}

	async resetPasswordRequest(email: string): Promise<void> {
		const user = await User.findBy("email", email);
		if (!user) return; // Don't reveal if the email exists or not

		user.passwordResetToken = uuidv4();
		user.passwordResetExpires = DateTime.now().plus({ hours: 1 });
		await user.save();

		// await this.sendPasswordResetEmail(user)
	}

	async resetPassword(token: string, newPassword: string): Promise<User> {
		const user = await User.findBy("passwordResetToken", token);
		if (
			!user ||
			(user.passwordResetExpires ?? DateTime.now()) < DateTime.now()
		) {
			throw new CustomException("Invalid or expired reset token", 403);
		}

		user.password = await Hash.make(newPassword);
		user.passwordResetToken = null;
		user.passwordResetExpires = null;
		await user.save();

		return user;
	}

	async verifyEmail(token: string): Promise<User> {
		const user = await User.findBy("emailVerifyCode", token);
		if (
			!user ||
			(user.passwordResetExpires ?? DateTime.now()) < DateTime.now()
		) {
			throw new CustomException("Invalid or expired reset token", 403);
		}

		user.emailVerified = true;
		user.emailVerifyCode = null;
		user.emailVerifyExpires = null;
		user.emailVerifyDate = DateTime.now();
		await user.save();

		return user;
	}

	async changePassword(
		userId: number,
		currentPassword: string,
		newPassword: string,
	): Promise<User> {
		const user = await User.findOrFail(userId);
		if (!(await Hash.verify(user.password ?? "", currentPassword))) {
			throw new CustomException("Current password is incorrect", 403);
		}

		user.password = await Hash.make(newPassword);
		await user.save();

		return user;
	}

	async oauthLogin(
		provider: "google" | "facebook",
		profile: {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			id: any;
			email: string;
			given_name: string;
			first_name: string;
			family_name: string;
			last_name: string;
		},
	): Promise<User> {
		let user = await User.findBy(`${provider}Id`, profile.id);

		if (!user) {
			user = await this.userRepository.create({
				email: profile.email,
				firstName: profile.given_name || profile.first_name,
				lastName: profile.family_name || profile.last_name,
				[`${provider}Id`]: profile.id,
				emailVerified: true,
			});
		}

		user.lastLogin = DateTime.now();
		await user.save();

		return user;
	}

	//   private async sendVerificationEmail(user: User): Promise<void> {
	//     await Mail.send((message) => {
	//       message
	//         .from(Env.get('MAIL_FROM_ADDRESS'))
	//         .to(user.email)
	//         .subject('Verify your email')
	//         .htmlView('emails/verify', { user, verificationUrl: `${Env.get('APP_URL')}/verify-email/${user.emailVerifyCode}` })
	//     })
	//   }

	//   private async sendPasswordResetEmail(user: User): Promise<void> {
	//     await Mail.send((message) => {
	//       message
	//         .from(Env.get('MAIL_FROM_ADDRESS'))
	//         .to(user.email)
	//         .subject('Reset your password')
	//         .htmlView('emails/reset-password', { user, resetUrl: `${Env.get('APP_URL')}/reset-password/${user.passwordResetToken}` })
	//     })
	//   }
}
