import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import type { IAuthRepository } from "../interfaces/IAuthRepository";

@injectable()
export class AuthRepository implements IAuthRepository {
	private connection: PrismaClient;
	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async createPasswordResetRequest(
		id: number,
		token: string,
		tokenExpiry: Date,
	): Promise<void> {
		await this.connection.user.update({
			where: { id },
			data: {
				profile: {
					update: {
						passwordResetToken: token,
						passwordReset: true,
						passwordResetExpires: tokenExpiry,
					},
				},
			},
		});
	}

	async updatePassword(id: number, password: string): Promise<void> {
		await this.connection.user.update({
			where: { id },
			data: {
				password,
				profile: {
					update: {
						passwordReset: false,
						passwordResetExpires: null,
						passwordResetToken: null,
					},
				},
			},
		});
	}

	async updatePasswordDirectly(id: number, newPassword: string): Promise<void> {
		await this.connection.user.update({
			where: { id },
			data: { password: newPassword },
		});
	}
}
