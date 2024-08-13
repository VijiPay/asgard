import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { ISendEmailRepository } from "../interfaces/ISendEmailRepository";

@injectable()
export class SendEmailRepository implements ISendEmailRepository {
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

	async confirmEmailVerification(token: string): Promise<void> {
		await this.connection.profile.update({
			where: { emailVerifyCode: token },
			data: {
				emailVerified: true,
				emailVerifyCode: null,
				emailVerifyExpires: null,
				emailVerifyDate: new Date(),
			},
		});
	}
}
