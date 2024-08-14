import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { IEmailVerificationRepository } from "../interfaces/IEmailVerificationRepository";

@injectable()
export class SendEmailRepository implements IEmailVerificationRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async updateVerificationEmail(
		email: string,
		emailVerifyCode: string,
		emailVerifyExpires: Date,
	): Promise<void> {
		await this.connection.user.update({
			where: { email },
			data: {
				profile: {
					update: {
						emailVerifyCode,
						emailVerifyExpires,
					},
				},
			},
		});
	}
	async getEmailVerificationCode(token: string): Promise<{
		code: string | null;
		expiryDate: Date | null;
	}> {
		const verificationCode = await this.connection.profile.findUnique({
			where: { emailVerifyCode: token },
		});

		return {
			code: verificationCode?.emailVerifyCode ?? null,
			expiryDate: verificationCode?.emailVerifyExpires ?? null,
		};
	}

	async confirmEmailVerification(token: string): Promise<string> {
		const user = await this.connection.profile.update({
			where: { emailVerifyCode: token },
			data: {
				emailVerified: true,
				emailVerifyCode: null,
				emailVerifyExpires: null,
				emailVerifyDate: new Date(),
			},
			include: { user: true },
		});

		return user?.user.email;
	}
}
