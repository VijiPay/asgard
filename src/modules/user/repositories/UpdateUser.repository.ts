import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { UserStatus } from "../constants/UserStatus";
import type { IUpdateUserRepository } from "../interface/IUpdateUserRepository";

@injectable()
export class UpdateUserRepository implements IUpdateUserRepository {
	connection;

	constructor(dataSource: PrismaClient) {
		this.connection = dataSource;
	}

	async disable(userId: number): Promise<void> {
		await this.connection.user.update({
			where: {
				id: userId,
			},
			data: {
				status: UserStatus.SUSPENDED,
			},
		});
	}
}
