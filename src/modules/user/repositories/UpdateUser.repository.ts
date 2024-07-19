import type { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import { UserStatus } from "../constants/UserStatus";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import type { IUpdateUserRepository } from "../interface/IUpdateUserRepository";
import type { IUserProfile } from "../interface/IUserProfile";

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

	async update(user: Partial<IUserProfile>): Promise<void> {
		const updateUserDTO = new UpdateUserDTO(user);

		const profileUpdateData = updateUserDTO.profile
			? {
					address: updateUserDTO.profile.address,
					phoneNumber: updateUserDTO.profile.phoneNumber,
				}
			: {};

		await this.connection.user.update({
			where: { id: user.id },
			data: {
				email: updateUserDTO.email,
				profile: {
					update: profileUpdateData,
				},
			},
			include: {
				profile: true,
				paymentMethods: true,
			},
		});
	}
}
